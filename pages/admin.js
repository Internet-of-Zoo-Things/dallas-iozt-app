import React from 'react'
import withApollo from '../components/apollo'
import Layout from '../components/layout'
import AdminComponent from '../components/pages/Admin/Admin'

const Admin = () => (
  <Layout title="Admin">
    <AdminComponent />
  </Layout>
)

export default withApollo({ ssr: false })(Admin)
