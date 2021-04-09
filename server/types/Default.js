const { gql } = require('apollo-server-express')

const Default = gql`
  scalar Any
  type Default {
    _id: String
    name: String
    description: String
    type: String
    value: Any
    createdAt: DateTime
    updatedAt: DateTime
  }
  extend type Query {
    defaults(_id: String, name: String, type: String): [Default]
  }
  extend type Mutation {
    createDefault(name: String!, type: String!, description: String, value: Any!): Default
    updateDefault(_id: String!, name: String, type: String, description: String, value: Any): Default
    deleteDefault(_id: String!): Default
  }
`

module.exports = Default
