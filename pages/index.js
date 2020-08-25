import React from 'react'
import PropTypes from 'prop-types'
import withApollo from '../components/apollo'
import { Layout } from '../components/layout'
import { withCurrentUser } from '../components/providers'
import DashboardComponent from '../components/pages/Dashboard/Dashboard'

const Dashboard = ({ user }) => (
  <Layout title="Dashboard" user={user && user.activeUser}>
    <DashboardComponent />
  </Layout>
)
Dashboard.propTypes = {
  /** Currently signed-in user */
  user: PropTypes.object
}

export default withApollo({ ssr: true })(withCurrentUser(Dashboard))
