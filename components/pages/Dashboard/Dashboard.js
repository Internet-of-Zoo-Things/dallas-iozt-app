import React from 'react'
import { Typography, Button } from '../../primitives'
import FeederCard from './FeederCard'

const Dashboard = () => (
  <div className="flex flex-col">
    {/* buttons */}
    <div className="flex flex-row flex-wrap">
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
    <div className="flex flex-row sm:flex-col w-full mt-8">
      {/* Feeders */}
      <div className="flex flex-col items-center w-1/3 mr-8">
        <div className="w-full border-b border-border mb-4 text-center">
          <Typography variant="h4" className="text-dark-gray mb-1">Feeders</Typography>
        </div>
        <FeederCard status="Activated" name="Feeder 1" className="w-full" />
      </div>
      {/* Schedule */}
      <div className="flex flex-col flex-grow items-center">
        <div className="w-full border-b border-border mb-4 text-center">
          <Typography variant="h4" className="text-dark-gray mb-1">Schedule</Typography>
        </div>
      </div>
    </div>
  </div>
)

export default Dashboard
