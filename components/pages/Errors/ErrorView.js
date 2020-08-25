import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from '../../layout'
// import { Errors } from '../../../utils/models'

const ErrorView = ({ code, desc, msg }) => (
  <Layout
    title={`${code || 'Client'} Error`}
  >
    <div className="flex flex-col justify-center items-center mt-20">
      {code}
      {desc}
      {msg}
    </div>
  </Layout>
)
ErrorView.propTypes = {
  /** Status code that will be displayed on page */
  code: PropTypes.number,
  /** Description or subtitle placed in the content of the error */
  desc: PropTypes.string,
  /** Message placed under the description in the content of the error */
  msg: PropTypes.string
}

export default ErrorView
