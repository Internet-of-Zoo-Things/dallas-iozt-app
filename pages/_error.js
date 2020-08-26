import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { ErrorView } from '../components/pages/Errors'

const ErrorPage = ({ statusCode }) => {
  const router = useRouter()
  const params = router.query

  return (
    <ErrorView code={statusCode || params.code || 500} msg={params.msg} />
  )
}
ErrorPage.propTypes = {
  statusCode: PropTypes.number
}

export default ErrorPage
