import React from 'react'
import PropTypes from 'prop-types'
import withApollo from '../components/apollo'
import { Layout } from '../components/layout'
import { withCurrentUser } from '../components/providers'
import LogComponent from '../components/pages/Log/Log'

const dummyData = [{
  timestamp: new Date(),
  username: 'admin',
  message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
}, {
  timestamp: new Date('2020-08-23T13:09:47-05:00'),
  username: 'admin',
  message: 'This log was recorded a few days ago'
}]

const Log = ({ user }) => (
  <Layout title="Log" user={user && user.activeUser}>
    <LogComponent logs={dummyData} />
  </Layout>
)
Log.propTypes = {
  /** Currently signed-in user */
  user: PropTypes.object
}

export default withApollo({ ssr: true })(withCurrentUser(Log))
