import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-apollo'
import withApollo from '../components/apollo'
import { Layout } from '../components/layout'
import { withCurrentUser } from '../components/providers'
import UsersComponent from '../components/pages/Users/Users'
import { ALL_USERS } from '../utils/graphql/queries'

const Users = ({ user }) => {
  const { data, error, loading } = useQuery(ALL_USERS, {
    onError: (e) => console.error(e)
  })

  return (
    <Layout title="Users" user={user && user.activeUser} loading={loading} error={error}>
      <UsersComponent user={user ? user.activeUser : null} allUsers={data ? data.users : undefined} />
    </Layout>
  )
}
Users.propTypes = {
  /** Currently signed-in user */
  user: PropTypes.object
}

export default withApollo({ ssr: true })(withCurrentUser(Users))
