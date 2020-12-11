const { gql } = require('apollo-server-express')

const Update = gql`
  type UpdateReponse {
    update: Boolean
    latestVersion: String
    datePublished: DateTime
  }
  extend type Query {
    checkForUpdate: UpdateReponse
  }
`

module.exports = Update
