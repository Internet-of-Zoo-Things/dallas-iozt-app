const scheduler = require('node-schedule')
const FeedTimeModel = require('../../../server/models/FeedTime')
const { writeLog } = require('./index')

const sendToPython = async (feeder, quantity) => {
  return new Promise((resolve, reject) => {
    if (!feeder || !quantity) reject(Error('Missing data in job execution!'))
    console.warn(`Run feed for feeder "${feeder}" for ${quantity}s`)
    resolve(true)
  })
}

/**
 * The schedule context object is a dictionary where
 * each scheduled job can be access using the FeedTime
 * _id as its key.
 */

const scheduleJob = (feedTime, schedule) => {
  if (!feedTime || !schedule) throw Error('Missing data when scheduling job!')
  const {
    _id, feeder, quantity, timestamp
  } = feedTime
  /** check if job already exists for this feed time */
  if (_id in schedule) {
    schedule[_id].cancel()
  }
  schedule[_id] = scheduler.scheduleJob(new Date(timestamp), () => {
    sendToPython(feeder.name, quantity)
      .then(() => {
        /** remove job from list, since it's done */
        delete schedule[_id]
        /** remove feedtime from db */
        FeedTimeModel.findByIdAndDelete(_id)
          .then(() => {
            writeLog(`Successfully dispensed feed for ${quantity}s from feeder "${feeder.name}"`, 'feed time')
              .catch((err) => {
                console.error('Could not write to log:')
                console.error(err)
              })
          })
          .catch((err) => {
            console.error(`Unable to delete feedtime ${_id}`)
            console.error(err)
          })
      })
      .catch((err) => {
        console.error(err)
        // todo: reschedule job for a later time?
        writeLog(`Failed to dispensed feed for ${quantity}s from feeder "${feeder.name}"`, 'error')
          .catch((e) => {
            console.error('Could not write to log:')
            console.error(e)
          })
      })
  })
}

const deleteJob = ({ _id }, schedule) => {
  if (!_id || !schedule) throw Error('Missing data when cancelling job!')
  delete schedule[_id]
}

const deleteAllJobs = (schedule) => {
  Object.keys(schedule).forEach((k) => {
    delete schedule[k]
  })
}

module.exports = {
  scheduleJob,
  deleteJob,
  deleteAllJobs
}
