import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../../layout'
import { Errors } from '../../../utils/models'
import { Typography, StyledLink, Button } from '../../primitives'

const ErrorView = ({
  user,
  code,
  msg,
  desc,
  noWrapper
}) => {
  const view = (
    <div className="flex flex-col justify-center items-center mt-20">
      <Typography variant="h1">{code} Error</Typography>
      <Typography variant="h4">{msg || Errors[code]}</Typography>
      { desc ? <Typography variant="body" className="mt-2">{desc}</Typography> : null }
      <div className="mt-6">
        <StyledLink href="/">
          <Button large>Back to the dashboard</Button>
        </StyledLink>
      </div>
    </div>
  )

  if (noWrapper) return view

  return (
    <Layout
      title={`${code || 'Client'} Error`}
      user={user}
    >
      { view }
    </Layout>
  )
}
ErrorView.propTypes = {
  /** Status code that will be displayed on page */
  code: PropTypes.number,
  /** Message explaining the error code itself */
  msg: PropTypes.string,
  /** Optional description for further clarification */
  desc: PropTypes.string,
  /** Display the error without the layout wrapper */
  noWrapper: PropTypes.bool,
  user: PropTypes.object
}

export default ErrorView
