import React from 'react'
import { ErrorView } from '../components/pages/Errors'
import withApollo from '../components/apollo'

const _403 = () => (
  <ErrorView
    code={403}
    msg="Sorry, you don't have access to this page!"
    desc="Please contact the site administrators for access."
  />
)

export default withApollo({ ssr: true })(_403)
