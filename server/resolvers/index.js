const lodash = require('lodash')
const User = require('./User')
const Log = require('./Log')
const Animal = require('./Animal')
const Feeder = require('./Feeder')

const resolvers = lodash.merge(
  User,
  Log,
  Animal,
  Feeder
)

module.exports = resolvers
