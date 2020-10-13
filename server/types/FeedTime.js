const { gql } = require('apollo-server-express')

const FeedTime = gql`
  type FeedTime {
    _id: String
    feeder: String
    timestamp: DateTime
    quantity: Float
    created_at: DateTime
    updated_at: DateTime
  }
  extend type Query {
    feedTimes: [FeedTime]
  }
  extend type Mutation {
    createFeedTime(feeder: String!, timestamp: DateTime!, quantity: Float!): FeedTime
    updateFeedTime(_id: String!, feeder: String, timestamp: DateTime, quantity: Float): FeedTime
    deleteFeedTime(_id: String!): FeedTime
  }
`

module.exports = FeedTime
