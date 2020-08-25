import React from 'react'
import withApollo from '../components/apollo'
import { Typography } from '../components/primitives'

const Home = () => (
  <div>
    <Typography variant="h1" className="text-primary">Welcome to IoZT!</Typography>
  </div>
)

export default withApollo({ ssr: true })(Home)
