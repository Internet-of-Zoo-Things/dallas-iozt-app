import React, { useState } from 'react'
import { useQuery } from 'react-apollo'
import withApollo from '../components/apollo'
import Layout from '../components/layout'
import LogComponent from '../components/pages/Log/Log'
import { GET_LOGS, GET_LOG_TAGS } from '../utils/graphql/queries'

const PAGE_SIZE = 15

const Log = () => {
  const [tag, setTag] = useState(undefined)
  const [page, setPage] = useState(0)

  const { data, error, loading } = useQuery(GET_LOGS, {
    variables: { tag, limit: PAGE_SIZE, skip: (PAGE_SIZE * page) },
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
        currentPage={page}
        changePage={setPage}
        totalPages={data ? Math.ceil(data.logCount / PAGE_SIZE) : 0}
      />
    </Layout>
  )
}

export default withApollo({ ssr: true })(Log)
