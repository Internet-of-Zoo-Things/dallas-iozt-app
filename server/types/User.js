const { gql } = require('apollo-server-express')

const User = gql`
  scalar DateTime
  type User {
    _id: String
    username: String
    role: String
    name: String
    email: String
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
  },
  extend type Mutation {
    createUser(userInput: UserInput!): User
    updateUser(_id: String!, userInput: UserInput!): User
    deleteUser(_id: String!): User
  }
`

module.exports = User
