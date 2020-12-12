const { ApolloError } = require('apollo-server-express')
const { checkLatestVersion } = require('../../utils/functions/api')

const Update = {
  Query: {
    async checkForUpdate(parent, _, { models }) {
      const latest = await checkLatestVersion()
        .catch((err) => {
          console.error(err)
          throw new ApolloError('Unable to access repository')
        })
      return {
        ...latest
      }
    }
  }
}

module.exports = Update
