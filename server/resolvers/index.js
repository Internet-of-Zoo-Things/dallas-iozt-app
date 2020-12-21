const lodash = require('lodash')
const Log = require('./Log')
const Animal = require('./Animal')
const Feeder = require('./Feeder')
const FeedTime = require('./FeedTime')
const Habitat = require('./Habitat')
const Update = require('./Update')
const Default = require('./Default')
const Pi = require('./Pi')

const resolvers = lodash.merge(
  Log,
  Animal,
  Feeder,
  FeedTime,
  Habitat,
  Update,
  Default,
  Pi
)

module.exports = resolvers
