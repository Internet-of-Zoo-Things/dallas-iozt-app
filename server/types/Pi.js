const { gql } = require('apollo-server-express')

const Pi = gql`
  extend type Query {
    uptime: DateTime
  }
  extend type Mutation {
    compactDatabase: Boolean
  }
`

module.exports = Pi
