const { ApolloError } = require('apollo-server-express')
const { ensureCapitalized, writeLog } = require('../../utils/functions/api')

const Habitat = {
  Query: {
    async habitats(parent, _, { models }) {
      return models.Habitat.find()
        .catch((err) => { throw new ApolloError(err) })
    }
  },
  Mutation: {
    async createHabitat(parent, { name, description }, { models }) {
      return models.Habitat.create({
        name: ensureCapitalized(name),
        description: ensureCapitalized(description)
      })
        .catch((err) => { throw new ApolloError(err) })
        .then(async (data) => {
          await writeLog(`Created new habitat "${name}"`, 'habitat')
          return data
        })
    },
    async updateHabitat(parent, { _id, ...args }, { models }) {
      if (args.name) args.name = ensureCapitalized(args.name)
      if (args.description) args.description = ensureCapitalized(args.description)
      return models.Habitat.findByIdAndUpdate(_id, args, { new: true })
        .catch((err) => { throw new ApolloError(err) })
        .then(async (data) => {
          await writeLog(`Updated habitat "${data.name}"`, 'habitat')
          return data
        })
    },
    async deleteHabitat(parent, { _id }, { models }) {
      return models.Habitat.findByIdAndDelete(_id) //todo: move animals from this habitat
        .catch((err) => { throw new ApolloError(err) })
        .then(async (data) => {
          await writeLog(`Deleted habitat "${data.name}"`, 'habitat')
          return data
        })
    }
  }
}

module.exports = Habitat
