import React from 'react'
import PropTypes from 'prop-types'
import withApollo from '../components/apollo'
import { Layout } from '../components/layout'
import { withCurrentUser } from '../components/providers'
import UsersComponent from '../components/pages/Users/Users'

const Users = ({ user }) => (
  <Layout title="Users" user={user && user.activeUser}>
    <UsersComponent user={user ? user.activeUser : null} allUsers={/* fixme: add data */ [user ? user.activeUser : null]} />
  </Layout>
)
Users.propTypes = {
  /** Currently signed-in user */
  user: PropTypes.object
}

export default withApollo({ ssr: true })(withCurrentUser(Users))
