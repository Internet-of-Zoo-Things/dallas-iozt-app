import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_USER } from '../../utils/graphql/queries'

export function withCurrentUser(Component) {
  return function withCurrentUserComponent(props) {
    const { data, error, loading } = useQuery(GET_USER, {
      onError: (e) => console.error(e)
    })
    return (
      <>
        <Component user={data} error={error} loading={loading} {...props} />
      </>
    )
  }
}

export default withCurrentUser
