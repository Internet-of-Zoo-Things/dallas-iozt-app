const { ApolloError } = require('apollo-server-express')
const { ensureCapitalized, writeLog } = require('../../utils/functions/api')

const AnimalTaxon = {
  Query: {
    async animalTaxons(parent, filter, { models }) {
      return new Promise((resolve, reject) => {
        models.AnimalTaxon.find(filter, (err, data) => {
          if (err) reject(err)
          resolve(data)
        })
      })
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
          await writeLog(models, `Created animal taxon "${name}"`, 'animal taxon')
          return data
        })
    },
    async updateAnimalTaxon(parent, { _id, ...args }, { models }) {
      if (args.name) args.name = ensureCapitalized(args.name)
      return models.AnimalTaxon.findByIdAndUpdate(_id, args, { new: true })
        .catch((err) => { throw new ApolloError(err) })
        .then(async (data) => {
          await writeLog(models, `Updated animal taxon "${data.name}"`, 'animal taxon')
          return data
        })
    },
    async deleteAnimalTaxon(parent, { _id }, { models }) {
      await models.Animal.deleteMany({ type: _id })
        .catch((err) => { throw new ApolloError(err) })
      return models.AnimalTaxon.findByIdAndDelete(_id)
        .catch((err) => { throw new ApolloError(err) })
        .then(async (data) => {
          await writeLog(models, `Deleted animal taxon "${data.name}"`, 'animal taxon')
          return data
        })
    }
  }
}

module.exports = AnimalTaxon
