const { ApolloError } = require('apollo-server-express')
const moment = require('moment')
const mongoose = require('mongoose')
const { writeLog, createSchedule } = require('../../utils/functions/api')
const { scheduleJob, deleteJob, deleteAllJobs } = require('../../utils/functions/api/jobScheduling')

const Feeder = {
  Query: {
    async feedTimes(parent, { includePrevious = false }, { models }) {
      return models.FeedTime.find(includePrevious ? {} : { timestamp: { $gte: new Date() } })
        .populate('feeder')
        .catch((err) => { throw new ApolloError(err) })
    }
  },
  Mutation: {
    async createFeedTime(parent, args, { models, schedule }) {
      return models.FeedTime.findOneAndUpdate({ _id: mongoose.Types.ObjectId(), user_set: true }, args, {
        new: true,
        upsert: true
      })
        .populate('feeder')
        .catch((err) => { throw new ApolloError(err) })
        .then(async (data) => {
          scheduleJob(data, schedule)
          await writeLog(`Created feed time "${moment(data.timestamp).format('MMM Do, hh:mm:ss a')}" from feeder "${data.feeder.name}"`, 'feed time')
          return data
        })
    },
    async updateFeedTime(parent, { _id, ...args }, { models, schedule }) {
      return models.FeedTime.findByIdAndUpdate(_id, args, {
        new: true
      })
        .populate('feeder')
        .catch((err) => { throw new ApolloError(err) })
        .then(async (data) => {
          scheduleJob(data, schedule)
          await writeLog(`Edited feed time "${moment(data.timestamp).format('MMM Do, hh:mm:ss a')}" from feeder "${data.feeder.name}"`, 'feed time')
          return data
        })
    },
    async deleteFeedTime(parent, { _id }, { models, schedule }) {
      return models.FeedTime.findByIdAndDelete(_id)
        .populate('feeder')
        .catch((err) => { throw new ApolloError(err) })
        .then(async (data) => {
          deleteJob(_id, schedule)
          await writeLog(`Deleted feed time "${moment(data.timestamp).format('MMM Do, hh:mm:ss a')}" from feeder "${data.feeder.name}"`, 'feed time')
          return data
        })
    },
    async deleteAllUpcomingFeedTimes(parent, _, { models, schedule }) {
      return models.FeedTime.deleteMany({ timestamp: { $gte: new Date() } })
        .catch((err) => { throw new ApolloError(err) })
        .then(async () => {
          deleteAllJobs(schedule)
          await writeLog('Deleted all upcoming feed times', 'feed time')
          return true
        })
    },
    async createDailySchedule(parent, { debug }, { models }) {
      return createSchedule(debug).then(() => {
        return models.FeedTime.find({ timestamp: { $gte: new Date() } })
          .populate('feeder')
          .catch((err) => { throw new ApolloError(err) })
      }).catch((err) => { throw new ApolloError(err) })
    }
  }
}

module.exports = Feeder
