const lodash = require('lodash')
const User = require('./User')
const Log = require('./Log')
const Animal = require('./Animal')
const Feeder = require('./Feeder')
const Notifications = require('./Notification')

const resolvers = lodash.merge(
  User,
  Log,
  Animal,
  Feeder,
  Notifications
)

module.exports = resolvers
