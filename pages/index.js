import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useQuery } from 'react-apollo'
import withApollo from '../components/apollo'
import Layout from '../components/layout'
import { withCurrentUser } from '../components/providers'
import DashboardComponent from '../components/pages/Dashboard/Dashboard'
import { GET_ANIMALS } from '../utils/graphql/queries'

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
  status: 'disabled'
}, {
  name: 'Feeder 2',
  status: 'online'
}]

const Dashboard = ({ user }) => {
  /* searchbars */
  const [animalSearch, setAnimalSearch] = useState('')

  /* api interaction */
  const { data: animalsData, loading: animalsLoading, error: animalsError } = useQuery(GET_ANIMALS, {
    variables: { filter: animalSearch },
    fetchPolicy: 'no-cache',
    pollInterval: (1000 * 60) // refetch every minute
  })

  return (
    <Layout title="Dashboard" user={user && user.activeUser} error={animalsError}>
      <DashboardComponent
        user={user && user.activeUser}
        schedule={dummySchedule}
        feeders={dummyFeeders}
        animals={animalsData ? animalsData.animals : []}
        animalSearch={animalSearch}
        setAnimalSearch={setAnimalSearch}
        animalsLoading={animalsLoading}
      />
    </Layout>
  )
}
Dashboard.propTypes = {
  /** Currently signed-in user */
  user: PropTypes.object
}

export default withApollo({ ssr: true })(withCurrentUser(Dashboard))
