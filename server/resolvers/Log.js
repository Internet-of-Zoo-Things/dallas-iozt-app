const { ApolloError } = require('apollo-server-express')

const User = {
  Query: {
    async logs(parent, args, { models }) {
      return models.Log.find()
        .catch((err) => { throw new ApolloError(err) })
    }
  }
}

module.exports = User
