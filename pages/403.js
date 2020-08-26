import React from 'react'
import PropTypes from 'prop-types'
import { ErrorView } from '../components/pages/Errors'
import withApollo from '../components/apollo'
import { withCurrentUser } from '../components/providers'

const _403 = ({ user }) => (
  <ErrorView
    code={403}
    msg="Sorry, you don't have access to this page!"
    desc="Please contact the site administrators for access."
    user={user ? user.activeUser : null}
  />
)
_403.propTypes = {
  user: PropTypes.object
}

export default withApollo({ ssr: true })(withCurrentUser(_403))
