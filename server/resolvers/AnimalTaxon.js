const { ApolloError } = require('apollo-server-express')

const AnimalTaxon = {
  Query: {
    async animalTaxons(parent, filter, { models }) {
      return models.AnimalTaxon.find(filter)
        .catch((err) => { throw new ApolloError(err) })
    }
  },
  Mutation: {
    async createAnimalTaxon(parent, args, { models }) {
      return models.AnimalTaxon.create(args)
        .catch((err) => { throw new ApolloError(err) })
    },
    async updateAnimalTaxon(parent, { _id, ...args }, { models }) {
      return models.AnimalTaxon.findByIdAndUpdate(_id, args, { new: true })
        .catch((err) => { throw new ApolloError(err) })
    },
    async deleteAnimalTaxon(parent, { _id }, { models }) {
      return models.AnimalTaxon.findByIdAndDelete(_id)
        .catch((err) => { throw new ApolloError(err) })
    }
  }
}

module.exports = AnimalTaxon
