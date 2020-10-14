import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useQuery } from 'react-apollo'
import withApollo from '../components/apollo'
import Layout from '../components/layout'
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

const Dashboard = ({ client }) => {
  /* searchbars */
  const [animalSearch, setAnimalSearch] = useState('')

  /* api interaction */
  const { data: animalsData, loading: animalsLoading, error: animalsError } = useQuery(GET_ANIMALS, {
    variables: { filter: animalSearch },
    awaitRefetchQueries: true,
    notifyOnNetworkStatusChange: true
    // pollInterval: (1000 * 60) // refetch every minute -- disabled due to causing form fields to reset while user edits form
  })
  const { data: feedersData, loading: feedersLoading, error: feedersError } = useQuery(GET_FEEDERS, {
    awaitRefetchQueries: true,
    notifyOnNetworkStatusChange: true
    // pollInterval: (1000 * 60) // refetch every minute -- disabled due to causing form fields to reset while user edits form
  })

  return (
    <Layout title="Dashboard" error={animalsError || feedersError}>
      <DashboardComponent
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
  /* apollo client used to write to the cache */
  client: PropTypes.any
}

export default withApollo({ ssr: true })(Dashboard)
