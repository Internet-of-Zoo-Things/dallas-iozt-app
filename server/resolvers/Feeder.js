const { ApolloError } = require('apollo-server-express')
const { ensureCapitalized, writeLog } = require('../../utils/functions/api')

const Feeder = {
  Query: {
    async feeders(parent, args, { models }) {
      return models.Feeder.find()
        .populate('habitat')
        .catch((err) => { throw new ApolloError(err) })
    }
  },
  Mutation: {
    async createFeeder(parent, { name, description, habitat }, { models }) {
      return models.Feeder.create({
        name: ensureCapitalized(name),
        description: ensureCapitalized(description),
        habitat,
        status: 'online'
      })
        .catch((err) => { throw new ApolloError(err) })
        .then(async (data) => {
          await writeLog(models, `Created feeder "${name}"`, 'feeder')
          return data.populate('habitat')
        })
    },
    async updateFeeder(parent, { _id, ...args }, { models }) {
      if (args.name) args.name = ensureCapitalized(args.name)
      if (args.remaining_percentage) {
        const trigger = await models.Default.findOne({ name: 'feeder_disable_capacity' })
          .catch((err) => {
            console.error('Could not pull defaults in order to update feeder status based on remaining_percentage manual update')
            console.error(err)
          })
        args.status = args.remaining_percentage >= trigger.value ? 'online' : 'disabled'
      }
      return models.Feeder.findByIdAndUpdate(_id, args, { new: true })
        .catch((err) => { throw new ApolloError(err) })
        .then(async (data) => {
          await writeLog(models, `Updated feeder "${data.name}"`, 'feeder')
          return data.populate('habitat')
        })
    },
    async deleteFeeder(parent, { _id }, { models }) {
      return models.Feeder.findByIdAndDelete(_id)
        .catch((err) => { throw new ApolloError(err) })
        .then(async (data) => {
          await writeLog(models, `Deleted feeder "${data.name}"`, 'feeder')
          return data
        })
    }
  }
}

module.exports = Feeder
