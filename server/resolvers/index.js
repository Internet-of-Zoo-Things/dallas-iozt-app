const lodash = require('lodash')
const User = require('./User')
const Log = require('./Log')

const resolvers = lodash.merge(
  User,
  Log
)

module.exports = resolvers
