const lodash = require('lodash')
const Log = require('./Log')
const Animal = require('./Animal')
const Feeder = require('./Feeder')
const FeedTime = require('./FeedTime')
const Habitat = require('./Habitat')
const Update = require('./Update')

const resolvers = lodash.merge(
  Log,
  Animal,
  Feeder,
  FeedTime,
  Habitat,
  Update
)

module.exports = resolvers
