const lodash = require('lodash')
const Log = require('./Log')
const Animal = require('./Animal')
const Feeder = require('./Feeder')
const FeedTime = require('./FeedTime')
const Habitat = require('./Habitat')

const resolvers = lodash.merge(
  Log,
  Animal,
  Feeder,
  FeedTime,
  Habitat
)

module.exports = resolvers
