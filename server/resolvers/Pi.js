const { ApolloError } = require('apollo-server-express')
const { compactDatabase } = require('../../utils/functions/api')

const Pi = {
  Query: {
    async uptime(parent, _, { start_time }) {
      return start_time
    }
  },
  Mutation: {
    async compactDatabase(parent, _, { models }) {
      try {
        return compactDatabase(models)
      } catch (err) {
        throw new ApolloError(err)
      }
    }
  }
}

module.exports = Pi
