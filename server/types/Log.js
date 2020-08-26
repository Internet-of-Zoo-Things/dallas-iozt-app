const { gql } = require('apollo-server-express')

const Log = gql`
  type Log {
    _id: String
    timestamp: DateTime
    username: String
    message: String
  }
  input LogInput {
    timestamp: DateTime
    username: String!
    message: String!
  }
  extend type Query {
    logs: [Log]
  }
`

module.exports = Log
