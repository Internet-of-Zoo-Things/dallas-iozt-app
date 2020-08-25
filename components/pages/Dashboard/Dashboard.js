import React from 'react'
import { Typography, Button } from '../../primitives'
import FeederCard from './FeederCard'

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
    {/* feeders */}
    <div className="flex flex-row mt-8">
      <FeederCard status="Activated" name="Feeder 1" />
    </div>
  </div>
)

export default Dashboard
