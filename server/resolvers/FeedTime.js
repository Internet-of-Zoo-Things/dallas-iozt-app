const { ApolloError } = require('apollo-server-express')
const moment = require('moment')
const mongoose = require('mongoose')
const { writeLog, createSchedule } = require('../../utils/functions/api')

const Feeder = {
  Query: {
    async feedTimes(parent, { includePrevious = false }, { models }) {
      return models.FeedTime.find(includePrevious ? {} : { timestamp: { $gte: new Date() } })
        .populate('feeder')
        .catch((err) => { throw new ApolloError(err) })
    }
  },
  Mutation: {
    async createFeedTime(parent, args, { models }) {
      return models.FeedTime.findOneAndUpdate({ _id: mongoose.Types.ObjectId() }, args, {
        new: true,
        upsert: true
      })
        .populate('feeder')
        .catch((err) => { throw new ApolloError(err) })
        .then(async (data) => {
          await writeLog(`Created feed time "${moment(data.timestamp).format('MMM Do, hh:mm:ss a')}" from feeder "${data.feeder.name}"`, 'feed time')
          return data
        })
    },
    async updateFeedTime(parent, { _id, ...args }, { models }) {
      return models.FeedTime.findByIdAndUpdate(_id, args, {
        new: true
      })
        .populate('feeder')
        .catch((err) => { throw new ApolloError(err) })
        .then(async (data) => {
          await writeLog(`Edited feed time "${moment(data.timestamp).format('MMM Do, hh:mm:ss a')}" from feeder "${data.feeder.name}"`, 'feed time')
          return data
        })
    },
    async deleteFeedTime(parent, { _id }, { models }) {
      return models.FeedTime.findByIdAndDelete(_id)
        .populate('feeder')
        .catch((err) => { throw new ApolloError(err) })
        .then(async (data) => {
          await writeLog(`Deleted feed time "${moment(data.timestamp).format('MMM Do, hh:mm:ss a')}" from feeder "${data.feeder.name}"`, 'feed time')
          return data
        })
    },
    async deleteAllUpcomingFeedTimes(parent, _, { models }) {
      return models.FeedTime.deleteMany({ timestamp: { $gte: new Date() } })
        .catch((err) => { throw new ApolloError(err) })
        .then(async () => {
          await writeLog('Deleted all upcoming feed times', 'feed time')
          return true
        })
    },
    async createDailySchedule() {
      return createSchedule().then(() => {
        return []
      }).catch((err) => { throw new ApolloError(err) })
    }
  }
}

module.exports = Feeder
