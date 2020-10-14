const { gql } = require('apollo-server-express')
const Log = require('./Log')
const Animal = require('./Animal')
const Feeder = require('./Feeder')
const FeedTime = require('./FeedTime')

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
  ${Log}
  ${Animal}
  ${Feeder}
  ${FeedTime}
`

module.exports = types
