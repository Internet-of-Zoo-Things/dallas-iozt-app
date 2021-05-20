const { ApolloError } = require('apollo-server-express')
const moment = require('moment')
const { writeLog } = require('../../utils/functions/api')
const { scheduleJob, deleteJob, deleteAllJobs } = require('../../utils/functions/api/jobScheduling')

const populateFeedTime = async (models, feedtime) => {
  return new Promise((resolve, reject) => {
    models.Feeder.findOne({ _id: feedtime.feeder }, (err1, feeder) => {
      if (err1) reject(err1)
      else resolve({ ...feedtime, feeder })
    })
  })
}
const populateFeedTimes = async (models, feedtimes) => {
  return Promise.all(
    feedtimes.map((f) => populateFeedTime(models, f))
  )
}

const Feeder = {
  Query: {
    async feedTimes(parent, { includePrevious = false }, { models }) {
      return new Promise((resolve, reject) => {
        models.FeedTime.find(includePrevious ? {} : { timestamp: { $gte: Date.now() } }, (err, feedtimes) => {
          if (err) reject(err)
          else resolve(populateFeedTimes(models, feedtimes))
        })
      })
        .catch((err) => { throw new ApolloError(err) })
    }
  },
  Mutation: {
    async createFeedTime(parent, args, { models, schedule }) {
      return new Promise((resolve, reject) => {
        models.Feeder.findOne({ _id: args.feeder }, (err1, feeder) => {
          if (err1) reject(err1)
          if (!feeder) reject(Error('Feeder does not exist!'))
          else {
            models.FeedTime.insert({
              ...args,
              user_set: true
            }, (err2, feedtime) => {
              if (err2) reject(err2)
              else {
                feedtime = { ...feedtime, feeder }
                scheduleJob(models, feedtime, schedule)
                writeLog(models, `Created feed time "${moment(feedtime.timestamp).format('MMM Do, hh:mm:ss a')}" from feeder "${feeder.name}"`, 'feed time')
                  .then(() => { resolve(feedtime) })
              }
            })
          }
        })
      })
        .catch((err) => { throw new ApolloError(err) })
    },
    async updateFeedTime(parent, { _id, ...args }, { models, schedule }) {
      return new Promise((resolve, reject) => {
        /** check feeder */
        models.Feeder.findOne({ _id: args.feeder }, (err1, feeder) => {
          if (err1) reject(err1)
          if (!feeder) reject(Error('Feeder does not exist!'))
          else {
            /** check feed time */
            models.FeedTime.findOne({ _id }, (err2, feedtime) => {
              if (err2) reject(err2)
              else if (!feedtime) reject(Error('Feed time does not exist!'))
              else {
                /** update feed time */
                models.FeedTime.update({ _id }, {
                  $set: {
                    ...args,
                    user_set: true
                  }
                }, (err3) => {
                  if (err3) reject(err3)
                  else {
                    populateFeedTime(models, feedtime)
                      .then((populated) => {
                        scheduleJob(models, populated, schedule)
                        writeLog(models, `Updated feed time for "${moment(populated.timestamp).format('MMM Do, hh:mm:ss a')}" from feeder "${populated.feeder.name}"`, 'feed time')
                          .then(() => { resolve(populated) })
                      })
                  }
                })
              }
            })
          }
        })
      })
        .catch((err) => { throw new ApolloError(err) })
    },
    async deleteFeedTime(parent, { _id }, { models, schedule }) {
      return new Promise((resolve, reject) => {
        /** check feed time */
        models.FeedTime.findOne({ _id }, (err1, feedtime) => {
          if (err1) reject(err1)
          if (!feedtime) reject(Error('Feedtime does not exist!'))
          else {
            /** check feeder */
            models.Feeder.findOne({ _id: feedtime.feeder }, (err2, feeder = {}) => {
              if (err2) reject(err2)
              else {
                /** remove feed time */
                models.FeedTime.remove({ _id }, { multi: false }, (err3) => {
                  if (err3) reject(err3)
                  else {
                    try {
                      deleteJob(_id, schedule)
                    } catch (err) {
                      console.error(err)
                    }
                    writeLog(models, `Deleted feed time "${moment(feedtime.timestamp).format('MMM Do, hh:mm:ss a')}" from feeder "${feeder ? feeder.name : 'undefined'}"`, 'feed time')
                      .then(() => { resolve({ ...feedtime, feeder }) })
                  }
                })
              }
            })
          }
        })
      })
        .catch((err) => { throw new ApolloError(err) })
    },
    async deleteAllUpcomingFeedTimes(parent, _, { models, schedule }) {
      return new Promise((resolve, reject) => {
        models.FeedTime.remove({ timestamp: { $gte: Date.now() } }, { multi: true }, (err) => {
          if (err) reject(err)
          else {
            deleteAllJobs(schedule)
            writeLog(models, 'Deleted all upcoming feed times', 'feed time')
              .then(() => { resolve(true) })
          }
        })
      })
        .catch((err) => { throw new ApolloError(err) })
    }
    // async createDailySchedule(parent, { debug }, { models }) {
    //   return createSchedule(debug).then(() => {
    //     return models.FeedTime.find({ timestamp: { $gte: Date.now() } })
    //       .populate('feeder')
    //       .catch((err) => { throw new ApolloError(err) })
    //   }).catch((err) => { throw new ApolloError(err) })
    // }
  }
}

module.exports = Feeder
