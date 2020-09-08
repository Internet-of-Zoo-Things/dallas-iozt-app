const { ApolloError } = require('apollo-server-express')

const User = {
  Query: {
    async logs(parent, { tag }, { models }) {
      return models.Log.find(tag ? { tag } : {}).sort({ timestamp: -1 })
        .catch((err) => { throw new ApolloError(err) })
    }
  }
}

module.exports = User
