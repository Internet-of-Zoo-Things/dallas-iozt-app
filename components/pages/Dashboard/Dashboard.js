import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Button } from '../../primitives'

const Dashboard = () => (
  <div className="flex flex-col">
    {/* buttons */}
    <div className="flex flex-row">
      <Button minimal className="mx-1">
        <Typography variant="body">Register Time</Typography>
      </Button>
      <Button minimal className="mx-1">
        <Typography variant="body">Create Daily Schedule</Typography>
      </Button>
      <Button minimal className="mx-1">
        <Typography variant="body">Add Feeder</Typography>
      </Button>
    </div>
  </div>
)
Dashboard.propTypes = {
  /** Currently signed-in user */
  user: PropTypes.object
}

export default Dashboard
