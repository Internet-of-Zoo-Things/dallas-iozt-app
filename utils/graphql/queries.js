import gql from 'graphql-tag'

export const GET_LOGS = gql`
  query logs($tag: String) {
    logs(tag: $tag) {
      timestamp
      message
      tag
    }
  }
`

export const GET_LOG_TAGS = gql`
  query logTags {
    logTags
  }
`

export const GET_ANIMALS = gql`
  query animals($filter: String) {
    animals(filter: $filter) {
      _id
      name
      type
      intake
      onExhibit
    }
  }
`

export const GET_FEEDERS = gql`
  query feeders {
    feeders {
      _id
      name
      description
      status
    }
  }
`
