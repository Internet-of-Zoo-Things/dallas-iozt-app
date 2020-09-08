const { gql } = require('apollo-server-express')

const Log = gql`
  type Log {
    _id: String
    timestamp: DateTime
    username: String
    message: String
    tag: String
  }
  extend type Query {
    logs(tag: String): [Log]
  }
`

module.exports = Log
