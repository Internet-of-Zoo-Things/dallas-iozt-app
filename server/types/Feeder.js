const { gql } = require('apollo-server-express')

const Feeder = gql`
  type Feeder {
    _id: String
    name: String
    description: String
    status: String
    habitat: Habitat
    remaining_percentage: Float
    created_at: DateTime
    updated_at: DateTime
  }
  extend type Query {
    feeders: [Feeder]
  }
  extend type Mutation {
    createFeeder(name: String!, description: String, habitat: String!): Feeder
    updateFeeder(_id: String!, name: String, description: String, status: String, habitat: String): Feeder
    deleteFeeder(_id: String!): Feeder
  }
`

module.exports = Feeder
