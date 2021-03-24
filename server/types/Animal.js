const { gql } = require('apollo-server-express')

const Animal = gql`
  type Animal {
    _id: String
    name: String
    type: AnimalTaxon
    intake: Float
    habitat: Habitat
    createdAt: DateTime
    updatedAt: DateTime
  }
  extend type Query {
    animals(filter: String): [Animal]
  }
  extend type Mutation {
    createAnimal(name: String!, type: String!, intake: Float): Animal
    updateAnimal(_id: String!, name: String, type: String, intake: Float, habitat: String): Animal
    deleteAnimal(_id: String!): Animal
  }
`

module.exports = Animal
