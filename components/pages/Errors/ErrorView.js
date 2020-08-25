import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from '../../layout'
import { Errors } from '../../../utils/models'
import { Typography, StyledLink, Button } from '../../primitives'

const ErrorView = ({ code, msg }) => (
  <Layout
    title={`${code || 'Client'} Error`}
  >
    <div className="flex flex-col justify-center items-center mt-20">
      <Typography variant="h1">{code} Error</Typography>
      <Typography variant="h4">{msg || Errors[code]}</Typography>
      <div className="mt-6">
        <StyledLink href="/">
          <Button large>Back to the dashboard</Button>
        </StyledLink>
      </div>
    </div>
  </Layout>
)
ErrorView.propTypes = {
  /** Status code that will be displayed on page */
  code: PropTypes.number,
  /** Message placed under the description in the content of the error */
  msg: PropTypes.string
}

export default ErrorView
