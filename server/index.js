require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')
const cors = require('cors')
const express = require('express')
const next = require('next')
const mongoose = require('mongoose')

const typeDefs = require('./types')
const resolvers = require('./resolvers')
const models = require('./models')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 4000
const mongo = process.env.DB_URL

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

/* set up apollo graphql */
const app = next({ dev })
const handle = app.getRequestHandler()
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    // here, the database connection could be passed in, and any cookies/JWT can be read
    const user = { username: 'admin', name: 'Test User', role: 'ADMIN' }
    return {
      req, res, user, models
    }
  },
  playground: { version: '1.7.25' }
})
const corsOptions = {
  origin: true,
  credentials: true
}

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
    process.exit(1)
  })
