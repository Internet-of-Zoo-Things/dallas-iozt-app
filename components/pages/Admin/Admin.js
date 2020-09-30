import React from 'react'
import moment from 'moment'
import { Typography, Button } from '../../primitives'

const Admin = () => {
  const pi_start = moment().subtract(2, 'weeks')
  const update = moment().subtract(1, 'day')

  return (
    <div className="flex flex-col">
      <Typography variant="h4" className="text-dark-gray mb-4">Web Application Overview</Typography>
      <div className="flex mb-2">
        <Typography variant="body" weight="bold" className="mr-2">Raspberry Pi Uptime:</Typography>
        <Typography variant="body" className="mr-2">{(moment().diff(pi_start, 'days'))} days</Typography>
        <Typography variant="body" className="text-gray">(started on {pi_start.format('MMM Do, hh:mm:ss a')})</Typography>
      </div>
      <div className="flex">
        <Typography variant="body" weight="bold" className="mr-2">Latest software update:</Typography>
        <Typography variant="body" className="mr-2">{update.format('MMM Do, hh:mm:ss a')}</Typography>
        <Typography variant="body" className="text-gray mr-2">({update.fromNow()})</Typography>
      </div>
      <Typography variant="h4" className="text-dark-gray my-4">Actions</Typography>
      <div className="flex flex-col">
        <div className="mb-2"><Button>Check for software update</Button></div>
        <div className="mb-2"><Button intent="danger">Restart Raspberry Pi</Button></div>
      </div>
    </div>
  )
}
Admin.propTypes = {
}

export default Admin
