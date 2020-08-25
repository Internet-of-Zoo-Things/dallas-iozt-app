const { gql } = require('apollo-server-express')
const User = require('./User')

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
`

module.exports = types
