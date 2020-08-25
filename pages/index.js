import React from 'react'
import PropTypes from 'prop-types'
import withApollo from '../components/apollo'
import { Layout } from '../components/layout'
import { Typography } from '../components/primitives'
import { withCurrentUser } from '../components/providers'

const Dashboard = ({ user }) => (
  <Layout title="Dashboard" user={user && user.activeUser}>
    <Typography variant="h1" className="text-primary">Welcome to IoZT!</Typography>
  </Layout>
)
Dashboard.propTypes = {
  /** Currently signed-in user */
  user: PropTypes.object
}

export default withApollo({ ssr: true })(withCurrentUser(Dashboard))
