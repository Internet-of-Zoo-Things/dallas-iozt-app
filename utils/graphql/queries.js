import gql from 'graphql-tag'

export const ACTIVE_USER = gql`
  query activeUser {
    activeUser {
      username
      name
      role
    }
  }
`

export const ALL_USERS = gql`
  query users {
    users {
      username
      name
      role
      email
      created_at
      updated_at
    }
  }
`

export const GET_LOGS = gql`
  query logs {
    logs {
      username
      timestamp
      message
    }
  }
`

export const GET_ANIMALS = gql`
  query animals($filter: String) {
    animals(filter: $filter) {
      _id
      name
      type
      intake
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
