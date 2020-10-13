const { ApolloError } = require('apollo-server-express')
const moment = require('moment')
const { writeLog } = require('../../utils/functions/api')

const Feeder = {
  Query: {
    async feedTimes(parent, args, { models }) {
      return models.FeedTimes.find()
        .populate('feeder')
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
      return models.FeedTime.findByIdAndDelete(_id)
        .populate('feeder')
        .catch((err) => { throw new ApolloError(err) })
        .then(async (data) => {
          await writeLog(user.username, `Deleted feed time "${moment(data.timestamp).format('MMM Do, hh:mm:ss a')}" from feeder "${data.feeder.name}"`, 'feed time')
          return data
        })
    }
  }
}

module.exports = Feeder
