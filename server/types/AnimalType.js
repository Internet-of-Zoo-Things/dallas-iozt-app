const { gql } = require('apollo-server-express')

const AnimalType = gql`
  type AnimalType {
    _id: String
    name: String
    type: String
    defaultIntake: Float
    created_at: DateTime
    updated_at: DateTime
  }
  extend type Query {
    animalTypes(filter: String): [AnimalType]
  }
  extend type Mutation {
    createAnimalType(name: String!, type: String!, defaultIntake: Float!): AnimalType
    updateAnimalType(_id: String!, name: String, type: String, defaultIntake: Float): AnimalType
    deleteAnimalType(_id: String!): AnimalType
  }
`

module.exports = AnimalType
