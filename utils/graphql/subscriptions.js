import gql from 'graphql-tag'

export const FEED_TIME_EXECUTED_SUBSCRIPTION = gql`
  subscription feedTimeExecuted {
    feedTimeExecuted {
      feedTime {
        _id
      }
      success
      error
    }
  }
`

export const FEED_TIME_CREATED_SUBSCRIPTION = gql`
  subscription feedTimeCreated {
    feedTimeCreated {
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
