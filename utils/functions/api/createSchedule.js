const moment = require('moment')
const mongoose = require('mongoose')
const { FeedTime, Animal, Feeder } = require('../../../server/models')

const unit = 'kg'
/* expected range of hours for feed times to occur, in military time */
const range = {
  start: 6,
  end: 22
}

/* approximate a guassian (normal) distribution */
const gaussian = (mean, stdev) => {
  let y2
  let use_last = false
  return function () {
    let y1
    if (use_last) {
      y1 = y2
      use_last = false
    } else {
      let x1
      let x2
      let w
      do {
        x1 = 2.0 * Math.random() - 1.0
        x2 = 2.0 * Math.random() - 1.0
        w = x1 * x1 + x2 * x2
      } while (w >= 1.0)
      w = Math.sqrt((-2.0 * Math.log(w)) / w)
      y1 = x1 * w
      y2 = x2 * w
      use_last = true
    }

    const retval = mean + stdev * y1
    if (retval > 0) return retval
    return -retval
  }
}

/* algorithm for automatically creating a daily schedule */

/* note: i'm going to be liberal with my documentation here as this is
 * a more algorithmically complex section of code that may need revision
 */
const createSchedule = async (debug = false) => {
  const logDebug = (str) => { if (debug) console.warn(str) }

  logDebug('\nCreating daily schedule...')

  // get all times from the start of today until the end of today
  const times = await FeedTime.find({
    $and: [
      { timestamp: { $gte: moment().startOf('day').toDate() } },
      { timestamp: { $lt: moment().add(1, 'day').startOf('day').toDate() } }
    ]
  }).populate('feeder')
  // parse the times, assuming elapsed times correspond to feedings that have occured already
  let dispensed_quantity = 0 // quantity of food dispensed already
  logDebug(`${dispensed_quantity} ${unit} of feed dispensed already today`)
  const remaining_times = []
  times.forEach((time) => {
    if ((new Date()).getTime() >= (new Date(time.timestamp)).getTime()) {
      dispensed_quantity += time.quantity
    } else {
      remaining_times.push(time)
    }
  })
  logDebug(`${remaining_times.length} upcoming feed times for today`)

  // get all animals that require feeding
  const animals = await Animal.find({ onExhibit: true })
  const required_quantity = animals.reduce((acc, curr) => acc + curr.intake, 0) // quantity of food required daily
  logDebug(`${required_quantity} ${unit} of feed required for today`)

  // get all available feeders we can use
  const feeders = await Feeder.find({ status: 'online' })
  const used_feeders_dict = {} // stores data about which feeders have already dispensed today, to improve feed location variety
  feeders.forEach((feeder) => { used_feeders_dict[feeder.name] = 0 })
  times.forEach((time) => { used_feeders_dict[time.feeder.name] += 1 })

  const remaining_quantity = required_quantity - dispensed_quantity // quantity of food that still needs to be dispensed

  if (remaining_quantity === 0) {
    logDebug('Daily allottment of feed has already been dispersed! No changes needed.')
    return
  }
  if (remaining_quantity > 0) {
    logDebug('Not enough feed is scheduled to be dispensed. Creating new feed times and/or modifying exist times...')
  } else {
    logDebug('Too much feed is scheduled to be dispense. Deleting and/or modifying existing feed times...')
  }
}

module.exports = { createSchedule }
