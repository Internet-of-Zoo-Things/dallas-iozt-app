import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import withApollo from '../components/apollo'
import Layout from '../components/layout'
import { withCurrentUser } from '../components/providers'
import DashboardComponent from '../components/pages/Dashboard/Dashboard'

const dummySchedule = [{
  timestamp: moment().add(30, 'minutes'),
  feeder: 'Feeder 1'
}, {
  timestamp: moment().add(2, 'hours'),
  feeder: 'Feeder 2'
}, {
  timestamp: moment().add(7, 'hours'),
  feeder: 'Feeder 2'
}, {
  timestamp: moment().add(8, 'hours'),
  feeder: 'Feeder 1'
}]

const dummyFeeders = [{
  name: 'Feeder 1',
  status: 'Online'
}, {
  name: 'Feeder 2',
  status: 'Online'
}]

const dummyAnimals = [{
  name: 'Ellie',
  type: 'Elephant',
  intake: 8 // daily food intake in lbs
}, {
  name: 'Eva',
  type: 'Elephant',
  intake: 9
}, {
  name: 'Gerald',
  type: 'Giraffe',
  intake: 5
}, {
  name: 'Manny',
  type: 'Monkey',
  intake: 2
}]

const Dashboard = ({ user }) => (
  <Layout title="Dashboard" user={user && user.activeUser}>
    <DashboardComponent user={user && user.activeUser} schedule={dummySchedule} feeders={dummyFeeders} animals={dummyAnimals} />
  </Layout>
)
Dashboard.propTypes = {
  /** Currently signed-in user */
  user: PropTypes.object
}

export default withApollo({ ssr: true })(withCurrentUser(Dashboard))
