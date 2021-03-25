const scheduler = require('node-schedule')
const axios = require('axios')
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
        reject(err)
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
const scheduleJob = (models, feedTime, schedule) => {
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
      .then(() => {
        try {
          /** remove job from list, since it's done */
          delete schedule[_id]
          /** remove feedtime from db */
          models.FeedTime.remove({ _id }, { multi: false }, (removeErr) => {
            if (removeErr) {
              console.error(removeErr)
              throw Error(`Unable to delete feedtime ${_id}`)
            } else {
              writeLog(models, `Successfully dispensed feed for ${quantity}s from feeder "${feeder.name}"`, 'feed time')
                .catch((err) => {
                  console.error(err)
                  throw Error('Could not write to log')
                })
                .then(() => {
                  /** modify the remaining feed percentage on the feeder */
                  models.Default.findOne({ name: 'feeder_capacity' }, (err1, { value: capacity }) => {
                    if (err1) {
                      console.error(err1)
                      throw Error('Could not recalculate remaining feed quantity, error pulling feeder_capacity')
                    } else {
                      models.Default.findOne({ name: 'feeder_disable_capacity' }, (err2, { value: disable_trigger }) => {
                        if (err2) {
                          console.error(err2)
                          throw Error('Could not recalculate remaining feed quantity, error pulling feeder_disable_capacity')
                        } else {
                          models.Feeder.findOne({ _id: feeder._id }, (err3, feederDoc) => {
                            if (err3) {
                              console.error(err3)
                              throw Error('Could not recalculate remaining feed quantity, error pulling feeder metadata')
                            } else {
                              const remaining_prev = feederDoc.remaining_percentage
                              const remaining_next = ((remaining_prev * capacity) - quantity) / capacity
                              feederDoc.remaining_percentage = remaining_next < 0 ? 0 : remaining_next // set to 0 if less than 0
                              if (remaining_next < disable_trigger) {
                                /** disable feeder from being scheduled since it's nearly out of feed */
                                feederDoc.status = 'disabled'
                              }
                              models.Feeder.update({ _id: feeder._id }, feederDoc, { multi: false }, (err4) => {
                                if (err4) {
                                  console.error(err4)
                                  throw Error('Unable to save feeder doc')
                                }
                              })
                            }
                          })
                        }
                      })
                    }
                  })
                })
            }
          })
        } catch (err) {
          console.error(err)
        }
      })
      .catch(() => {
        // todo: reschedule job for a later time?
        writeLog(models, `Failed to dispensed feed for ${quantity}s from feeder "${feeder.name}"`, 'error')
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
  return schedule
}

const deleteAllJobs = (schedule) => {
  Object.keys(schedule).forEach((k) => {
    delete schedule[k]
  })
  return schedule
}

const initializeSchedule = async (models, schedule) => {
  /** grab all upcoming feedtimes */
  return new Promise((resolve, reject) => {
    models.FeedTime.find({ timestamp: { $gte: new Date() } }, (err1, feedtimes) => {
      if (err1) reject(err1)
      else {
        models.Feeder.find({}, (err2, feeders) => {
          if (err2) reject(err2)
          else {
            const feedersDict = feeders.reduce((dict, curr) => { dict[curr._id] = curr; return dict }, {})
            Promise.all(feedtimes.map(async (f) => scheduleJob({ ...f, feeder: feedersDict[f.feeder] }, schedule)))
              .then(() => resolve(true))
          }
        })
      }
    })
  })
    .catch((err) => { throw err })
}

module.exports = {
  scheduleJob,
  deleteJob,
  deleteAllJobs,
  initializeSchedule
}
