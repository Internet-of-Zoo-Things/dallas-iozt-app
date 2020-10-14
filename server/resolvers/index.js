const lodash = require('lodash')
const Log = require('./Log')
const Animal = require('./Animal')
const Feeder = require('./Feeder')

const resolvers = lodash.merge(
  Log,
  Animal,
  Feeder
)

module.exports = resolvers
