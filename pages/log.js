import React, { useState } from 'react'
import { useQuery } from 'react-apollo'
import withApollo from '../components/apollo'
import Layout from '../components/layout'
import LogComponent from '../components/pages/Log/Log'
import { GET_LOGS, GET_LOG_TAGS } from '../utils/graphql/queries'

const Log = () => {
  const [tag, setTag] = useState(undefined)

  const { data, error, loading } = useQuery(GET_LOGS, {
    variables: { tag },
    fetchPolicy: 'no-cache',
    onError: (e) => console.error(e)
  })

  const { data: allTags, error: tagsError, loading: tagsLoading } = useQuery(GET_LOG_TAGS, {
    onError: (e) => console.error(e)
  })

  return (
    <Layout title="Log" error={error || tagsError}>
      <LogComponent
        logs={data ? data.logs : undefined}
        loading={loading || tagsLoading}
        filter={tag}
        setFilter={setTag}
        allTags={allTags ? allTags.logTags : undefined}
      />
    </Layout>
  )
}

export default withApollo({ ssr: true })(Log)
