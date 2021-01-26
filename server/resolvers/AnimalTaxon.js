const { ApolloError } = require('apollo-server-express')
const { ensureCapitalized, writeLog } = require('../../utils/functions/api')

const AnimalTaxon = {
  Query: {
    async animalTaxons(parent, filter, { models }) {
      return models.AnimalTaxon.find(filter)
        .catch((err) => { throw new ApolloError(err) })
    }
  },
  Mutation: {
    async createAnimalTaxon(parent, { name, defaultIntake }, { models }) {
      return models.AnimalTaxon.create({
        name: ensureCapitalized(name),
        defaultIntake
      })
        .catch((err) => { throw new ApolloError(err) })
        .then(async (data) => {
          await writeLog(`Created animal taxon "${name}"`, 'animal taxon')
          return data
        })
    },
    async updateAnimalTaxon(parent, { _id, ...args }, { models }) {
      if (args.name) args.name = ensureCapitalized(args.name)
      return models.AnimalTaxon.findByIdAndUpdate(_id, args, { new: true })
        .catch((err) => { throw new ApolloError(err) })
        .then(async (data) => {
          await writeLog(`Updated animal taxon "${data.name}"`, 'animal taxon')
          return data
        })
    },
    async deleteAnimalTaxon(parent, { _id }, { models }) {
      return models.AnimalTaxon.findByIdAndDelete(_id)
        .catch((err) => { throw new ApolloError(err) })
        .then(async (data) => {
          await writeLog(`Deleted animal taxon "${data.name}"`, 'animal taxon')
          return data
        })
    }
  }
}

module.exports = AnimalTaxon
