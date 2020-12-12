import gql from 'graphql-tag'

export const CHECK_SOFTWARE_VERSION = gql`
  query checkSoftwareVersion {
    checkSoftwareVersion
  }
`

export const CHECK_FOR_UPDATE = gql`
  query checkForUpdate {
    checkForUpdate {
      update
      latestVersion
    }
  }
`

export const GET_LOGS = gql`
  query logs($tag: String, $limit: Int, $skip: Int) {
    logs(tag: $tag, limit: $limit, skip: $skip) {
      timestamp
      message
      tag
    }
    logCount(tag: $tag)
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
      habitat {
        _id
      }
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
      habitat {
        name
      }
    }
  }
`

export const GET_FEED_TIMES = gql`
  query feedTimes {
    feedTimes {
      _id
      feeder {
        _id
        name
      }
      timestamp
      quantity
    }
  }
`

export const GET_HABITATS = gql`
  query habitats {
    habitats {
      _id
      name
      description
    }
  }
`
