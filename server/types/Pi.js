const { gql } = require('apollo-server-express')

const Pi = gql`
  extend type Query {
    uptime: DateTime
  }
`

module.exports = Pi
