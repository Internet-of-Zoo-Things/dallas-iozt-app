const { gql } = require('apollo-server-express')

const Log = gql`
  type Log {
    _id: String
    timestamp: DateTime
    message: String
    tag: String
  }
  extend type Query {
    logs(tag: String, limit: Int, skip: Int): [Log]
    logCount(tag: String): Int
    logTags: [String]
  }
`

module.exports = Log
