const { gql } = require('apollo-server-express')
const Log = require('./Log')
const Animal = require('./Animal')
const Feeder = require('./Feeder')
const FeedTime = require('./FeedTime')
const Habitat = require('./Habitat')
const Update = require('./Update')

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
  ${Habitat}
  ${Update}
`

module.exports = types
