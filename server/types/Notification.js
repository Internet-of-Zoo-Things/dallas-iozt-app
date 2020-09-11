const { gql } = require('apollo-server-express')

const Notification = gql`
  type Notification {
    _id: String
    message: String
    timestamp: DateTime
    viewed: Boolean
  }
  extend type Query {
    notifications: [Notification]!
  }
  extend type Mutation {
    viewNotifications(_ids: [String]!, viewed: Boolean): [Notification]!
    deleteNotifications(_ids: [String]!): [Notification]
  }
`

module.exports = Notification
