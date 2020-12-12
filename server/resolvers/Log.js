const { ApolloError } = require('apollo-server-express')

const Log = {
  Query: {
    async logs(parent, { tag, limit, skip }, { models }) {
      return models.Log.find(tag ? { tag } : {}).sort({ timestamp: -1 }).limit(limit).skip(skip || 0)
        .catch((err) => { throw new ApolloError(err) })
    },
    async logCount(parent, { tag }, { models }) {
      return models.Log.countDocuments(tag ? { tag } : {}).catch((err) => { throw new ApolloError(err) })
    },
    async logTags(parent, args, { models }) {
      return models.Log.distinct('tag').catch((err) => { throw new ApolloError(err) })
    }
  }
}

module.exports = Log
