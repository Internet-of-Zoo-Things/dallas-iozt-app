import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-apollo'
import withApollo from '../components/apollo'
import Layout from '../components/layout'
import DashboardComponent from '../components/pages/Dashboard/Dashboard'
import {
  GET_ANIMALS, GET_FEEDERS, GET_FEED_TIMES, GET_HABITATS
} from '../utils/graphql/queries'

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
  const { data: feedTimesData, loading: feedTimesLoading, error: feedTimesError } = useQuery(GET_FEED_TIMES, {
    awaitRefetchQueries: true,
    notifyOnNetworkStatusChange: true
    // pollInterval: (1000 * 60) // refetch every minute -- disabled due to causing form fields to reset while user edits form
  })
  const { data: habitats, habitatsLoading } = useQuery(GET_HABITATS, {
    awaitRefetchQueries: true,
    notifyOnNetworkStatusChange: true
    // pollInterval: (1000 * 60) // refetch every minute -- disabled due to causing form fields to reset while user edits form
  })

  return (
    <Layout title="Dashboard" error={animalsError || feedersError || feedTimesError}>
      <DashboardComponent
        schedule={feedTimesData ? feedTimesData.feedTimes : []}
        scheduleLoading={feedTimesLoading}
        feeders={feedersData ? feedersData.feeders : []}
        feedersLoading={feedersLoading}
        animals={animalsData ? animalsData.animals : []}
        animalSearch={animalSearch}
        setAnimalSearch={setAnimalSearch}
        animalsLoading={animalsLoading}
        habitats={habitats ? habitats.habitats : []}
        habitatsLoading={habitatsLoading}
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
