const { gql } = require('apollo-server-express')

const Update = gql`
  type UpdateReponse {
    update: Boolean
    latestVersion: SoftwareVersion
  }
  type SoftwareVersion {
    version: String
    date: DateTime
  }
  extend type Query {
    checkSoftwareVersion: SoftwareVersion
    checkForUpdate: UpdateReponse
  }
`

module.exports = Update
