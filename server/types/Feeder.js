const { gql } = require('apollo-server-express')

const Feeder = gql`
  type Feeder {
    _id: String
    name: String
    description: String
    status: String
    created_at: DateTime
    updated_at: DateTime
  }
  extend type Query {
    feeders: [Feeder]
  }
  extend type Mutation {
    createFeeder(name: String!, description: String): Feeder!
    updateFeeder(_id: String!, name: String, description: String, status: String): Feeder
    deleteFeeder(_id: String!): Feeder
  }
`

module.exports = Feeder
