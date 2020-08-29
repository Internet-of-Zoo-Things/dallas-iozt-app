import React from 'react'
import { useQuery } from 'react-apollo'
import PropTypes from 'prop-types'
import withApollo from '../components/apollo'
import Layout from '../components/layout'
import { withCurrentUser } from '../components/providers'
import LogComponent from '../components/pages/Log/Log'
import { GET_LOGS } from '../utils/graphql/queries'

const Log = ({ user }) => {
  const { data, error, loading } = useQuery(GET_LOGS, {
    onError: (e) => console.error(e)
  })

  return (
    <Layout title="Log" user={user && user.activeUser} loading={loading} error={error}>
      <LogComponent logs={data ? data.logs : undefined} />
    </Layout>
  )
}
Log.propTypes = {
  /** Currently signed-in user */
  user: PropTypes.object
}

export default withApollo({ ssr: true })(withCurrentUser(Log))
