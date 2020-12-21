require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')
const cors = require('cors')
const express = require('express')
const next = require('next')
const mongoose = require('mongoose')
const cron = require('node-cron')

const typeDefs = require('./types')
const resolvers = require('./resolvers')
const models = require('./models')
const {
  // createSchedule,
  checkCurrentVersion,
  checkLatestVersion
} = require('../utils/functions/api')
const { initializeSchedule } = require('../utils/functions/api/jobScheduling')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 4000
const mongo = process.env.DB_URL

/* monitor uptime */
const start_time = new Date()

/* connect to the db */
mongoose.connect(mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).catch(() => {
  console.error('Failed to connect to Mongo')
})
mongoose.connection.on('open', () => {
  console.warn(`Successfully connected to Mongo at ${mongo}`)
})
mongoose.connection.on('error', (err) => {
  console.error('Mongo error:')
  console.error(err)
})

/* initialize defaults in mongo if they don't already exist */
require('../utils/functions/api/initializeDefaults')

/* configure one-time job scheduling dict for feedings, animal habitat transitions */
const schedule = {}
/* initialize schedule based on existing feed times */
initializeSchedule(schedule)
  .catch((err) => {
    console.error('Unable to initialize feeding schedule:')
    console.error(err)
    process.exit(1)
  })
  .then(() => {
    console.warn(`Initialized feeding schedule based on ${Object.keys(schedule).length} existing feed times.`)
  })

/* set up apollo graphql */
const app = next({ dev })
const handle = app.getRequestHandler()
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    // here, the database connection could be passed in, and any cookies/JWT can be read
    return {
      req, res, models, schedule, start_time
    }
  },
  playground: { version: '1.7.25' }
})
const corsOptions = {
  origin: true,
  credentials: true
}

/* set up cron job to automatically create daily schedule */
const cron_schedule = '* 6 * * *'
console.warn(`* Initializing automatic daily scheduling (${cron_schedule})`)
const job = cron.schedule(cron_schedule, () => { // 6 am daily
  console.warn('CRON: Creating daily schedule')
  // createSchedule()
  //   .catch((err) => {
  //     console.error('Could not create daily schedule!')
  //     console.error(err)
  //   })
  //   .then(() => {
  //     // todo: expire old feedtimes (past 1 week)
  //   })
})

/* check app versioning and look for updates */
const curr_version = checkCurrentVersion()
console.warn(`* Currently running webapp version ${curr_version}`)
checkLatestVersion()
  .then((d) => {
    if (curr_version === d) console.warn('* Webapp software is up-to-date')
    else console.warn(`* UPDATE NEEDED: ${curr_version} -> ${d}\n* Go to the Admin page to perform this update`)
  })
  .catch((err) => {
    console.error('! Could not access GitHub to check for software updates')
    console.error(`Error: ${err.message}`)
  })

/* prepare the api */
app.prepare()
  .then(() => {
    const server = express()

    server.use(cors(corsOptions))
    server.use(apolloServer.getMiddleware({ cors: false }))

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.warn(`> UI ready on ${`http://localhost:${process.env.PORT}`}`)
      console.warn(`> GraphQL API ready on ${`http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    job.destroy()
    process.exit(1)
  })
