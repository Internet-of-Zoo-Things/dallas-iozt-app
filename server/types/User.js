const { gql } = require('apollo-server-express')

const User = gql`
  scalar DateTime
  type Notification {
    _id: String
    message: String
    timestamp: DateTime
    viewed: Boolean
  }
  type User {
    _id: String
    username: String
    role: String
    name: String
    email: String
    notifications: [Notification]
    created_at: DateTime
    updated_at: DateTime
  }
  input UserFilter {
    _id: String
    username: String
    role: String
    name: String
    email: String
  }
  input UserInput {
    username: String!
    role: String!
    name: String!
    email: String
  }
  extend type Query {
    activeUser: User
    users(filter: UserFilter): [User]
    notifications(viewed: Boolean): [Notification]
  },
  extend type Mutation {
    createUser(userInput: UserInput!): User
    updateUser(_id: String!, userInput: UserInput!): User
    deleteUser(_id: String!): User
    updateNotifications(_ids: [String]!, viewed: Boolean!): [Notification]
    deleteNotifications(_ids: [String]!): [Notification]
  }
`

module.exports = User
