const { gql } = require('apollo-server-express')

const Habitat = gql`
  type Habitat {
    _id: String
    name: String
    description: String
    created_at: DateTime
    updated_at: DateTime
  }
  extend type Query {
    habitats: [Habitat]
  }
  extend type Mutation {
    createHabitat(name: String!, description: String): Habitat
    updateHabitat(_id: String!, name: String, description: String): Habitat
    deleteHabitat(_id: String!): Habitat
  }
`

module.exports = Habitat
