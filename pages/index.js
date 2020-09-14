import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useQuery } from 'react-apollo'
import withApollo from '../components/apollo'
import Layout from '../components/layout'
import { withCurrentUser } from '../components/providers'
import DashboardComponent from '../components/pages/Dashboard/Dashboard'
import { GET_ANIMALS, GET_FEEDERS } from '../utils/graphql/queries'

const dummySchedule = [{
  timestamp: moment().add(30, 'minutes'),
  feeder: 'Feeder 1',
  quantity: 2
}, {
  timestamp: moment().add(2, 'hours'),
  feeder: 'Feeder 2',
  quantity: 1
}, {
  timestamp: moment().add(7, 'hours'),
  feeder: 'Feeder 2',
  quantity: 3
}, {
  timestamp: moment().add(8, 'hours'),
  feeder: 'Feeder 1',
  quantity: 2
}]

const Dashboard = ({ user, client }) => {
  /* searchbars */
  const [animalSearch, setAnimalSearch] = useState('')

  /* api interaction */
  const { data: animalsData, loading: animalsLoading, error: animalsError } = useQuery(GET_ANIMALS, {
    variables: { filter: animalSearch },
    awaitRefetchQueries: true,
    notifyOnNetworkStatusChange: true,
    pollInterval: (1000 * 60) // refetch every minute
  })
  const { data: feedersData, loading: feedersLoading, error: feedersError } = useQuery(GET_FEEDERS, {
    awaitRefetchQueries: true,
    notifyOnNetworkStatusChange: true,
    pollInterval: (1000 * 60) // refetch every minute
  })

  return (
    <Layout title="Dashboard" user={user && user.activeUser} error={animalsError || feedersError}>
      <DashboardComponent
        user={user && user.activeUser}
        schedule={dummySchedule}
        feeders={feedersData ? feedersData.feeders : []}
        feedersLoading={feedersLoading}
        animals={animalsData ? animalsData.animals : []}
        animalSearch={animalSearch}
        setAnimalSearch={setAnimalSearch}
        animalsLoading={animalsLoading}
        client={client}
      />
    </Layout>
  )
}
Dashboard.propTypes = {
  /** Currently signed-in user */
  user: PropTypes.object,
  /* apollo client used to write to the cache */
  client: PropTypes.any
}

export default withApollo({ ssr: true })(withCurrentUser(Dashboard))
