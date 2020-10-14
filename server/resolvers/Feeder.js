const { ApolloError } = require('apollo-server-express')
const { ensureCapitalized, writeLog } = require('../../utils/functions/api')

const Feeder = {
  Query: {
    async feeders(parent, args, { models }) {
      return models.Feeder.find()
        .catch((err) => { throw new ApolloError(err) })
    }
  },
  Mutation: {
    async createFeeder(parent, { name, description }, { models }) {
      return models.Feeder.create({
        name: ensureCapitalized(name),
        description: ensureCapitalized(description),
        status: 'online'
      })
        .catch((err) => { throw new ApolloError(err) })
        .then(async (data) => {
          await writeLog(`Created feeder "${name}"`, 'feeder')
          return data
        })
    },
    async updateFeeder(parent, { _id, ...args }, { models }) {
      if (args.name) args.name = ensureCapitalized(args.name)
      return models.Feeder.findByIdAndUpdate(_id, args, { new: true })
        .catch((err) => { throw new ApolloError(err) })
        .then(async (data) => {
          await writeLog(`Updated feeder "${args.name}"`, 'feeder')
          return data
        })
    },
    async deleteFeeder(parent, { _id }, { models }) {
      return models.Feeder.findByIdAndDelete(_id)
        .catch((err) => { throw new ApolloError(err) })
        .then(async (data) => {
          await writeLog(`Deleted feeder "${data.name}"`, 'feeder')
          return data
        })
    }
  }
}

module.exports = Feeder
