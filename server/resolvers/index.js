const lodash = require('lodash')
const User = require('./User')
const Log = require('./Log')
const Animal = require('./Animal')

const resolvers = lodash.merge(
  User,
  Log,
  Animal
)

module.exports = resolvers
