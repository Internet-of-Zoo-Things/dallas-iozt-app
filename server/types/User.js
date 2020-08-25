const { gql } = require('apollo-server-express')

const User = gql`
  scalar DateTime
  type User {
    username: String
    role: String
    name: String
    created_on: DateTime
    updated_on: DateTime
  }
  extend type Query {
    activeUser: User
  }
`

module.exports = User
