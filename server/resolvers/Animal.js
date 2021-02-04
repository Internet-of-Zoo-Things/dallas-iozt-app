const { ApolloError } = require('apollo-server-express')
const { ensureCapitalized, writeLog } = require('../../utils/functions/api')

const Animal = {
  Query: {
    async animals(parent, { filter }, { models }) {
      const where = {}
      /* allow search functionality */
      if (filter) {
        where.$and = filter.split(' ').map((f) => ({
          $or: [
            { name: { $regex: new RegExp(`.*${f}.*`, 'i') } }
            /* can add additional filtering in the future */
          ]
        }))
      }
      return models.Animal.find(where)
        .populate('habitat')
        .populate('type')
        .catch((err) => { throw new ApolloError(err) })
    }
  },
  Mutation: {
    async createAnimal(parent, { name, type, intake }, { models }) {
      const taxon = await models.AnimalTaxon.find({ _id: type })
        .catch((err) => { throw new ApolloError(err) })
      if (!taxon || !taxon.length) throw new ApolloError('Animal taxon does not exist!')
      return models.Animal.create({
        name: ensureCapitalized(name),
        type,
        intake: intake || taxon[0].defaultIntake
      })
        .catch((err) => { throw new ApolloError(err) })
        .then(async (data) => {
          await writeLog(`Created animal "${name}"`, 'animal')
          return data
            .populate('habitat')
            .populate('type')
        })
    },
    async updateAnimal(parent, { _id, ...args }, { models }) {
      if (args.name) args.name = ensureCapitalized(args.name)
      return models.Animal.findByIdAndUpdate(_id, args, { new: true })
        .catch((err) => { throw new ApolloError(err) })
        .then(async (data) => {
          // write to the log for changes other than switching between habitats
          if (!(Object.keys(args).length === 1 && args.habitat)) await writeLog(`Updated animal "${data.name}"`, 'animal')
          return data
            .populate('habitat')
            .populate('type')
        })
    },
    async deleteAnimal(parent, { _id }, { models }) {
      return models.Animal.findByIdAndDelete(_id)
        .catch((err) => { throw new ApolloError(err) })
        .then(async (data) => {
          await writeLog(`Deleted animal "${data.name}"`, 'animal')
          return data
        })
    }
  }
}

module.exports = Animal
