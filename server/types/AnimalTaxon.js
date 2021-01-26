const { gql } = require('apollo-server-express')

const AnimalTaxon = gql`
  type AnimalTaxon {
    _id: String
    name: String
    defaultIntake: Float
    created_at: DateTime
    updated_at: DateTime
  }
  extend type Query {
    animalTaxons(_id: String, name: String, defaultIntake: Float): [AnimalTaxon]
  }
  extend type Mutation {
    createAnimalTaxon(name: String!, defaultIntake: Float!): AnimalTaxon
    updateAnimalTaxon(_id: String!, name: String, defaultIntake: Float): AnimalTaxon
    deleteAnimalTaxon(_id: String!): AnimalTaxon
  }
`

module.exports = AnimalTaxon
