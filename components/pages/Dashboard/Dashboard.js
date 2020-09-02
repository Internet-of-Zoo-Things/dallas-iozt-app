import React from 'react'
import PropTypes from 'prop-types'
import { Elevation } from '@blueprintjs/core'
import {
  Typography, Button, Card
} from '../../primitives'
import FeederCard from './FeederCard'
import Schedule from './Schedule'

const Dashboard = ({ user, schedule }) => (
  <div className="flex flex-row w-full">
    <div className="flex flex-col items-center w-1/3 mr-8">
      <Card
        header={<Typography variant="h4" className="ml-6 text-dark-gray py-3">Schedule</Typography>}
        elevation={Elevation.TWO}
        className="w-full mb-8"
      >
        <div className="w-full flex flex-col">
          <Button className="my-1" icon="add" fill>
            <Typography variant="body">Create Daily Schedule</Typography>
          </Button>
          <Button className="my-1" icon="time" fill>
            <Typography variant="body">Schedule a Feed</Typography>
          </Button>
        </div>
        <div className="w-full flex flex-col items-center">
          <Typography variant="subtitle" className="text-gray">UPCOMING</Typography>
          <Schedule schedule={schedule} user={user} />
        </div>
        <div className="w-full flex flex-col items-center">
          <Typography variant="subtitle" className="text-gray">GRAPHICAL TIMELINE</Typography>
          <div className="mt-2 rounded-md border border-border text-gray w-full flex justify-center items-center h-32">
            Graphical timeline here
          </div>
        </div>
      </Card>
    </div>
    <div className="flex flex-col items-center flex-grow">
      <Card
        header={
          <div className="flex w-full py-3">
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
        <div className="grid grid-cols-2 gap-4 mx-4">
          <FeederCard status="Activated" name="Feeder 1" />
          <FeederCard status="Activated" name="Feeder 2" />
        </div>
      </Card>
      <Card
        header={
          <div className="flex w-full py-3">
            <div className="flex flex-grow ml-6">
              <Typography variant="h4" className="text-dark-gray">Animals</Typography>
            </div>
            <div className="flex justify-center items-center">
              <Button className="mx-6" icon="add">
                <Typography variant="body">Add Animal</Typography>
              </Button>
            </div>
          </div>
        }
        elevation={Elevation.TWO}
        className="w-full mb-8"
      >
        <div className="flex flex-col items-center mx-4">
          <Typography variant="h6" className="text-gray">No animals found...</Typography>
        </div>
      </Card>
    </div>
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
