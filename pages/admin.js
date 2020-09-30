import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import withApollo from '../components/apollo'
import Layout from '../components/layout'
import { withCurrentUser } from '../components/providers'
import AdminComponent from '../components/pages/Admin/Admin'
import { compareUserRoles } from '../utils/functions/ui'
import { UserRoles } from '../utils/models'

const Admin = ({ user }) => {
  const router = useRouter()

  useEffect(() => {
    if (user) {
      if (compareUserRoles(user.activeUser.role, UserRoles.DEVELOPER) < 0) {
        router.push('/403')
      }
    }
  }, [router, user])

  if (!user) return <Layout title="Admin" loading />
  return (
    <Layout title="Admin" user={user && user.activeUser}>
      <AdminComponent />
    </Layout>
  )
}
Admin.propTypes = {
  /** Currently signed-in user */
  user: PropTypes.object
}

export default withApollo({ ssr: true })(withCurrentUser(Admin))
