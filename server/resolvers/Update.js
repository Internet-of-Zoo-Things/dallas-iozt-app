const { ApolloError } = require('apollo-server-express')
const { checkLatestVersion, checkCurrentVersion } = require('../../utils/functions/api')

const Update = {
  Query: {
    async checkSoftwareVersion() {
      return checkCurrentVersion()
    },
    async checkForUpdate() {
      const latest = await checkLatestVersion()
        .catch((err) => {
          console.error(err)
          throw new ApolloError('Unable to access repository')
        })
      const current = checkCurrentVersion()
      return {
        update: current === latest,
        ...latest
      }
    }
  }
}

module.exports = Update
