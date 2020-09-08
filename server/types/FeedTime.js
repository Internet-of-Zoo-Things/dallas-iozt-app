const { gql } = require('apollo-server-express')

const FeedTime = gql`
  type FeedTime {
    _id: String
    feeder: String
    timestamp: DateTime
    created_at: DateTime
    updated_at: DateTime
  }
  extend type Query {
    feedTimes: [FeedTime]
  }
  extend type Mutation {
    createFeedTime(feeder: String!, timestamp: DateTime): FeedTime!
    updateFeedTime(_id: String!, feeder: String, timestamp: DateTime): FeedTime
    deleteFeedTime(_id: String!): FeedTime
  }
`

module.exports = FeedTime
