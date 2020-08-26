const { gql } = require('apollo-server-express')
const User = require('./User')
const Log = require('./Log')

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
`

module.exports = types
