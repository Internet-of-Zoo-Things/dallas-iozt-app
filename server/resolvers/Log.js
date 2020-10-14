const { ApolloError } = require('apollo-server-express')

const Log = {
  Query: {
    async logs(parent, { tag }, { models }) {
      return models.Log.find(tag ? { tag } : {}).sort({ timestamp: -1 })
        .catch((err) => { throw new ApolloError(err) })
    },
    async logTags(parent, args, { models }) {
      return models.Log.distinct('tag')
    }
  }
}

module.exports = Log
