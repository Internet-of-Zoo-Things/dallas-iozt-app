const { gql } = require('apollo-server-express')
const User = require('./User')
const Log = require('./Log')
const Animal = require('./Animal')

const types = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  type Subscriptions {
    _empty: String
  }
  ${User}
  ${Log}
  ${Animal}
`

module.exports = types
