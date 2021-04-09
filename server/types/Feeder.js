const { gql } = require('apollo-server-express')

const Feeder = gql`
  type Feeder {
    _id: String
    name: String
    description: String
    status: String
    habitat: Habitat
    remaining_percentage: Float
    connectivity_id: Int
    createdAt: DateTime
    updatedAt: DateTime
  }
  extend type Query {
    feeders: [Feeder]
  }
  extend type Mutation {
    createFeeder(name: String!, description: String, habitat: String!, connectivity_id: Int!): Feeder
    updateFeeder(_id: String!, name: String, description: String, status: String, habitat: String, remaining_percentage: Float): Feeder
    deleteFeeder(_id: String!): Feeder
  }
`

module.exports = Feeder
