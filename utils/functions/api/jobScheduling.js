const scheduler = require('node-schedule')
const axios = require('axios')
const { FeedTime, Default, Feeder } = require('../../../server/models')
const { writeLog } = require('./index')

if (!process.env.LORA_CONTROLLER_SERVER) {
  console.error('! No lora controller server specified')
  if (process.env.NODE_ENV === 'production') {
    throw Error('Lora controller server must be specified in environment variables to run in production mode')
  }
}

const sendToPython = async (feeder, quantity) => {
  return new Promise((resolve, reject) => {
    if (!feeder || !quantity) reject(Error('Missing data in job execution!'))
    console.warn(`Run feed for feeder "${feeder}" for ${quantity}s`)
    axios.post(`${process.env.LORA_CONTROLLER_SERVERS}/feeds/${feeder}`, { runtime: quantity })
      .catch((err) => {
        // fixme: handle execution error depending on error nature (e.g. reschedule, delete, etc)
        console.warn(`Failed to execute feed: ${err}`)
        if (err.response.status === 404) {
          console.warn(`Are you sure you're running the lora controller server at ${process.env.LORA_CONTROLLER_SERVER}?`)
        }
        resolve(false)
      })
      .then(() => {
        resolve(true)
      })
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
    /** the job itself */
    sendToPython(feeder.name, quantity)
      .then((success) => {
        if (!success) throw Error()
        /** remove job from list, since it's done */
        delete schedule[_id]
        /** remove feedtime from db */
        FeedTime.findByIdAndDelete(_id)
          .then(() => {
            writeLog(`Successfully dispensed feed for ${quantity}s from feeder "${feeder.name}"`, 'feed time')
              .catch((err) => {
                console.error('Could not write to log:')
                console.error(err)
              })
              .then(() => {
                /** modify the remaining feed percentage on the feeder */
                Default.findOne({ name: 'feeder_capacity' })
                  .catch((err) => {
                    console.error('Could not recalculate remaining feed quantity, error pulling feeder_capacity')
                    console.error(err)
                  })
                  .then(({ value: capacity }) => {
                    Default.findOne({ name: 'feeder_disable_capacity' })
                      .catch((err) => {
                        console.error('Could not recalculate remaining feed quantity, error pulling feeder_disable_capacity')
                        console.error(err)
                      })
                      .then(({ value: disable_trigger }) => {
                        Feeder.findOne({ _id: feeder._id })
                          .catch((err) => {
                            console.error('Could not recalculate remaining feed quantity, error pulling feeder metadata')
                            console.error(err)
                          })
                          .then((feederDoc) => {
                            const remaining_prev = feederDoc.remaining_percentage
                            const remaining_next = ((remaining_prev * capacity) - quantity) / capacity
                            feederDoc.remaining_percentage = remaining_next < 0 ? 0 : remaining_next // set to 0 if less than 0
                            /** disable feeder from being scheduled since it's nearly out of feed */
                            if (remaining_next < disable_trigger) {
                              feederDoc.status = 'disabled'
                            }
                            feederDoc.save()
                              .catch((err) => {
                                console.error('Unable to save feeder document')
                                console.error(err)
                              })
                          })
                      })
                  })
              })
          })
          .catch((err) => {
            console.error(`Unable to delete feedtime ${_id}`)
            console.error(err)
          })
      })
      .catch(() => {
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

const initializeSchedule = async (schedule) => {
  return FeedTime.find({ timestamp: { $gte: new Date() } })
    .populate('feeder')
    .catch((err) => { throw err })
    .then((feedtimes) => {
      feedtimes.forEach((f) => scheduleJob(f, schedule))
    })
}

module.exports = {
  scheduleJob,
  deleteJob,
  deleteAllJobs,
  initializeSchedule
}
