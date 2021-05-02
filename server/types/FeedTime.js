const { gql } = require('apollo-server-express')

const FeedTime = gql`
  scalar DateTime
  type FeedTime {
    _id: String
    feeder: Feeder
    timestamp: DateTime
    quantity: Float
    user_set: Boolean
    createdAt: DateTime
    updatedAt: DateTime
  }
  type FeedTimeExecutionResult {
    feedTime: FeedTime
    success: Boolean
    error: String
  }
  extend type Query {
    feedTimes(includePrevious: Boolean): [FeedTime]
  }
  extend type Mutation {
    createFeedTime(feeder: String!, timestamp: DateTime!, quantity: Float!): FeedTime
    updateFeedTime(_id: String!, feeder: String, timestamp: DateTime, quantity: Float): FeedTime
    deleteFeedTime(_id: String!): FeedTime
    deleteAllUpcomingFeedTimes: Boolean
    # createDailySchedule(debug: Boolean): [FeedTime]
  }
  extend type Subscription {
    feedTimeAdded: FeedTime
    feedTimeExecuted: FeedTimeExecutionResult
  }
`

module.exports = FeedTime
