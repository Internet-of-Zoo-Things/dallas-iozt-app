const { ApolloError } = require('apollo-server-express')
const { ensureCapitalized } = require('../../utils/functions/api')

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
        description,
        status: 'online',
        created_at: new Date(),
        updated_at: new Date()
      })
        .catch((err) => { throw new ApolloError(err) })
    },
    async updateFeeder(parent, { _id, ...args }, { models }) {
      if (args.name) args.name = ensureCapitalized(args.name)
      return models.Feeder.findByIdAndUpdate(_id, {
        ...args,
        updated_at: new Date()
      })
        .catch((err) => { throw new ApolloError(err) })
    },
    async deleteFeeder(parent, { _id }, { models }) {
      return models.Feeder.findByIdAndDelete(_id)
        .catch((err) => { throw new ApolloError(err) })
    }
  }
}

module.exports = Feeder
