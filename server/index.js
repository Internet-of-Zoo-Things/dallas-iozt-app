require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')
const cors = require('cors')
const express = require('express')
const next = require('next')
const Datastore = require('nedb')
const cron = require('node-cron')

const typeDefs = require('./types')
const resolvers = require('./resolvers')
const {
  // createSchedule,
  checkCurrentVersion,
  checkLatestVersion,
  compactDatabase
} = require('../utils/functions/api')
const { initializeSchedule } = require('../utils/functions/api/jobScheduling')
const initializeDefaults = require('../utils/functions/api/initializeDefaults')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 4000

/* monitor uptime */
const start_time = new Date()

/* connect to the db */
const collections = [
  'Animal',
  'AnimalTaxon',
  'Default',
  'Feeder',
  'FeedTime',
  'Habitat',
  'Log'
]
const models = {}
collections.forEach((name) => {
  models[name] = new Datastore({ filename: `./data/${name.toLowerCase()}.db`, autoload: true, timestampData: true })
})

/* initialize defaults in mongo if they don't already exist */
initializeDefaults(models)
  .then(() => {
    /* configure one-time job scheduling dict for feedings, animal habitat transitions */
    const schedule = {}
    /* initialize schedule based on existing feed times */
    initializeSchedule(models, schedule)
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
      }
    })

    /* set up cron job to compact database every night at midnight */
    cron.schedule('0 0 * * *', () => compactDatabase(models))

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

    if (!dev && process.env.INTERNET_ENABLED) {
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
    }

    /* prepare the api */
    app.prepare()
      .then(() => {
        const server = express()

        server.use(cors({
          origin: true,
          credentials: true
        }))
        server.use(apolloServer.getMiddleware({ cors: false }))

        server.get('*', (req, res) => {
          return handle(req, res)
        })

        server.listen(port, (err) => {
          if (err) throw err
          console.warn(`> UI ready on http://localhost:${port}`)
          console.warn(`> GraphQL API ready on http://localhost:${port}${apolloServer.graphqlPath}`)
        })
      })
      .catch((ex) => {
        console.error(ex.stack)
        job.destroy()
        process.exit(1)
      })
  })
