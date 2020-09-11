const { gql } = require('apollo-server-express')
const User = require('./User')
const Log = require('./Log')
const Animal = require('./Animal')
const Feeder = require('./Feeder')
const FeedTime = require('./FeedTime')
const Notification = require('./Notification')

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
  ${Feeder}
  ${FeedTime}
  ${Notification}
`

module.exports = types
