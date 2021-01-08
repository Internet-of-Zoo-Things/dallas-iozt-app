const { gql } = require('apollo-server-express')

const Update = gql`
  type UpdateReponse {
    update: Boolean
    latestVersion: SoftwareVersion
  }
  type SoftwareVersion {
    version: String
    date: DateTime
    changes: [String]
  }
  extend type Query {
    checkSoftwareVersion: SoftwareVersion
    checkForUpdate: UpdateReponse
    getVersionHistory: [SoftwareVersion]
  }
`

module.exports = Update
