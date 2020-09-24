const { ApolloError } = require('apollo-server-express')
const { writeLog } = require('../../utils/functions/api')

const Feeder = {
  Query: {
    async feedTimes(parent, args, { models }) {
      return models.FeedTimes.find()
        .catch((err) => { throw new ApolloError(err) })
    }
  },
  Mutation: {
    async createFeedTime(parent, { feeder, timestamp, quantity }, { models, user }) {
      // todo
    },
    async updateFeedTime(parent, { _id, ...args }, { models, user }) {
      // todo
    },
    async deleteFeedTime(parent, { _id }, { models, user }) {
      // todo
    }
  }
}

module.exports = Feeder
