const { gql } = require('apollo-server-express')

const Update = gql`
  type UpdateReponse {
    update: Boolean
    latestVersion: String
  }
  extend type Query {
    checkSoftwareVersion: String
    checkForUpdate: UpdateReponse
  }
`

module.exports = Update
