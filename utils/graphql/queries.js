import gql from 'graphql-tag'

export const GET_USER = gql`
  query activeUser {
    activeUser {
      user_name
      name
      role
    }
  }
`
