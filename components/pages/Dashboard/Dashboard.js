import React from 'react'
import PropTypes from 'prop-types'
import { Elevation } from '@blueprintjs/core'
import {
  Typography, Button, Card, Icon as MyIcon
} from '../../primitives'
import FeederCard from './FeederCard'
import Schedule from './Schedule'

const Dashboard = ({ user, schedule }) => (
  <div className="flex flex-row w-full">
    <div className="flex flex-col items-center w-1/3 mr-8">
      <Card
        header={<Typography variant="h4" className="ml-6 text-dark-gray">Schedule</Typography>}
        elevation={Elevation.TWO}
        className="w-full mb-8"
      >
        <div className="w-full flex flex-col">
          <Button className="my-1" icon="time" fill>
            <Typography variant="body">Register Time</Typography>
          </Button>
          <Button className="my-1" icon="add" fill>
            <Typography variant="body">Create Daily Schedule</Typography>
          </Button>
        </div>
        <div className="w-full flex flex-col">
          <Schedule schedule={schedule} user={user} />
        </div>
      </Card>
    </div>
    <div className="flex flex-col items-center flex-grow">
      <Card
        header={
          <div className="flex w-full">
            <div className="flex flex-grow ml-6">
              <Typography variant="h4" className="text-dark-gray">Feeders</Typography>
            </div>
            <div className="flex justify-center items-center">
              <Button className="mx-6" icon="add">
                <Typography variant="body">Add Feeder</Typography>
              </Button>
            </div>
          </div>
        }
        elevation={Elevation.TWO}
        className="w-full mb-8"
      >

      </Card>
      <Card
        header={
          <div className="ml-6">
            <Typography variant="h4" className="text-dark-gray">Animals</Typography>
          </div>
        }
        elevation={Elevation.TWO}
        className="w-full mb-8"
      >
      </Card>
    </div>
    {/* Feeders */}
    {/* <div className="flex flex-col items-center w-1/3 mr-8">
      <div className="w-full border-b border-border mb-4 text-center">
        <Typography variant="h4" className="text-dark-gray mb-1">Feeders</Typography>
      </div>
      <FeederCard status="Activated" name="Feeder 1" className="w-full mb-4" />
      <FeederCard status="Activated" name="Feeder 2" className="w-full mb-4" />
    </div>
    {/* Schedule */}
    {/* <div className="flex flex-col flex-grow items-center">
      <div className="w-full border-b border-border mb-4 text-center">
        <Typography variant="h4" className="text-dark-gray mb-1">Schedule</Typography>
      </div>
      <Schedule schedule={schedule} user={user} />
    </div> */}
  </div>
)
Dashboard.propTypes = {
  user: PropTypes.object,
  schedule: PropTypes.array
}
Dashboard.defaultProps = {
  schedule: []
}

export default Dashboard
