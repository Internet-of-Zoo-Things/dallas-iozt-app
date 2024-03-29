const { ApolloError } = require('apollo-server-express')
const { checkLatestVersion, checkCurrentVersion, getVersionData } = require('../../utils/functions/api')

const Update = {
  Query: {
    async checkSoftwareVersion() {
      const version = checkCurrentVersion()
      const data = getVersionData(version)
      return {
        version,
        date: data && data.date
      }
    },
    async checkForUpdate() {
      const latest = await checkLatestVersion()
        .catch((err) => {
          console.error(err.message)
          throw new ApolloError('Unable to access repository')
        })
      const current = checkCurrentVersion()
      const data = getVersionData(latest)
      return {
        update: current !== latest,
        latestVersion: {
          version: latest,
          date: data && data.date
        }
      }
    },
    async getVersionHistory() {
      const hist = getVersionData()
      const versions = Object.keys(hist).map((v) => ({
        version: v,
        ...hist[v]
      }))
      return versions
    }
  }
}

module.exports = Update
