const moment = require('moment')
const mongoose = require('mongoose')

const createSchedule = () => {
  return new Promise((resolve, reject) => {
    console.warn('I am here!')
    resolve(true)
  })
}

module.exports = { createSchedule }
