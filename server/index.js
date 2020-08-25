require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')
const cors = require('cors')
const express = require('express')
const next = require('next')
const typeDefs = require('./types')
const resolvers = require('./resolvers')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 4000

const getUrl = () => (process.env.NODE_ENV === 'development'
  ? `http://localhost:${process.env.PORT}`
  : process.env.NODE_ENV === 'test'
    ? `${process.env.TEST_URL || 'http://localhost'}:${process.env.PORT}`
    : `${process.env.PROD_URL || 'http://localhost'}:${process.env.PORT}`)

const app = next({ dev })
const handle = app.getRequestHandler()
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    // here, the database connection could be passed in, and any cookies/JWT can be read
    const user = { user_name: 'test', name: 'Test User', role: 'Admin' }
    return {
      req, res, user
    }
  },
  playground: { version: '1.7.25' }
})
const corsOptions = {
  origin: true,
  credentials: true
}

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
      console.warn(`> UI ready on ${getUrl()}`)
      console.warn(`> GraphQL API ready on ${getUrl()}${apolloServer.graphqlPath}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
