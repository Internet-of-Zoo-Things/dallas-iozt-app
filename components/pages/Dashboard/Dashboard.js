import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Elevation, Overlay } from '@blueprintjs/core'
import {
  Typography, Button, Card, TextInput
} from '../../primitives'
import FeederCard from './FeederCard'
import FeedTimeCard from './FeedTimeCard'
import FeedTimeline from './FeedTimeline'
import {
  AddAnimalDialog, AddFeederDialog, AddFeedTimeDialog, DeleteAllFeedTimesDialog, AddHabitatDialog
} from './Dialogs'
import { GET_ANIMALS } from '../../../utils/graphql/queries'
import AnimalsBoard from './AnimalsBoard'

const Dashboard = ({
  schedule,
  scheduleLoading,
  feeders,
  feedersLoading,
  animals,
  animalSearch,
  setAnimalSearch,
  animalsLoading,
  habitats,
  habitatsLoading,
  client
}) => {
  /* dialogs */
  const [showAddFeederDialog, setShowAddFeederDialog] = useState(false)
  const [showAddAnimalDialog, setShowAddAnimalDialog] = useState(false)
  const [showAddFeedTimeDialog, setShowAddFeedTimeDialog] = useState(false)
  const [showDeleteAllFeedTimesDialog, setShowDeleteAllFeedTimesDialog] = useState(false)
  const [firstTimeOverlay, setFirstTimeOverlay] = useState(false)
  const [showAddHabitatDialog, setShowAddHabitatDialog] = useState(false)

  useEffect(() => {
    if (habitats && !habitats.length) setFirstTimeOverlay(true)
  }, [habitats])

  return (
    <div className="flex flex-col md:flex-col lg:flex-row xl:flex-row w-full">
      <div className="flex flex-col items-center w-full md:w-full lg:w-1/3 xl:w-1/3 mr-8">
        <Card
          header={<Typography variant="h4" className="ml-6 text-dark-gray py-3">Schedule</Typography>}
          elevation={Elevation.TWO}
          className="w-full mb-8"
        >
          <div className="w-full flex flex-col">
            <Button className="my-1" icon="add" fill disabled={!feeders.length}>
              <Typography variant="body">Create Daily Schedule</Typography>
            </Button>
            <Button className="my-1" icon="time" fill disabled={!feeders.length} onClick={() => setShowAddFeedTimeDialog(true)}>
              <Typography variant="body">Schedule a Feed</Typography>
            </Button>
          </div>
          <div className="w-full flex flex-col items-center">
            <Typography variant="subtitle" className="text-gray">UPCOMING</Typography>
            <div className="flex flex-col w-full items-center">
              {
                schedule.length !== 0 || scheduleLoading
                  ? <div className={`${animalsLoading ? 'bp3-skeleton h-32' : ''} w-full`}>
                    {
                      schedule.map((s, i) => (
                        <FeedTimeCard key={i} data={s} feeders={feeders || []} />
                      ))
                    }
                    <Button className="mt-2" minimal intent="danger" fill onClick={() => setShowDeleteAllFeedTimesDialog(true)}>
                      <Typography variant="subtitle">Clear All</Typography>
                    </Button>
                  </div>
                  : <Typography variant="body" className="flex w-full justify-center text-gray my-8">No scheduled feeds!</Typography>
              }
            </div>
          </div>
          <div className="w-full flex flex-col items-center">
            <Typography variant="subtitle" className="text-gray">GRAPHICAL TIMELINE</Typography>
            {
              schedule.length !== 0
                ? <FeedTimeline schedule={schedule} />
                : <Typography variant="body" className="flex w-full justify-center text-gray my-8">No scheduled feeds!</Typography>
            }
          </div>
        </Card>
      </div>
      <div className="flex flex-col items-center w-full md:w-full lg:w-2/3 xl:w-2/3">
        <Card
          header={
            <div className="flex w-full py-3">
              <div className="flex flex-grow ml-6">
                <Typography variant="h4" className="text-dark-gray">Feeders</Typography>
              </div>
              <div className="flex justify-center items-center">
                <Button className="mx-6" icon="add" onClick={() => setShowAddFeederDialog(true)} disabled={habitats && !habitats.length}>
                  <Typography variant="body">Add Feeder</Typography>
                </Button>
              </div>
            </div>
          }
          elevation={Elevation.TWO}
          className="w-full mb-8"
        >
          {
            feeders.length !== 0 || feedersLoading
              ? <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-4 ${feedersLoading ? 'bp3-skeleton h-32' : ''}`}>
                {
                  feeders.map((f, i) => (
                    <FeederCard {...f} key={i} client={client} />
                  ))
                }
              </div>
              : <Typography variant="h6" className="flex w-full justify-center text-gray">No feeders found...</Typography>
          }
        </Card>
        <Card
          header={
            <div className="flex w-full py-3">
              <div className="flex flex-grow ml-6">
                <Typography variant="h4" className="text-dark-gray">Animals</Typography>
              </div>
              <div className="flex justify-center items-center">
                <TextInput
                  placeholder="Search for an animal..."
                  onChange={(e) => setAnimalSearch(e.target.value)}
                  value={animalSearch}
                  className="mx-3"
                  clearButton={animalSearch !== ''}
                  leftElement={<Typography variant="icon" icon="search" />}
                />
                <Button className="mr-6" icon="add" onClick={() => setShowAddAnimalDialog(true)}>
                  <Typography variant="body">Add Animal</Typography>
                </Button>
              </div>
            </div>
          }
          elevation={Elevation.TWO}
          className="w-full mb-8"
        >
          <div className={animalsLoading || habitatsLoading ? 'bp3-skeleton h-32' : ''}>
            <AnimalsBoard
              animals={animals}
              habitats={habitats || []}
              onDelete={(id) => {
                client.writeQuery({
                  query: GET_ANIMALS,
                  variables: { filter: animalSearch },
                  data: {
                    animals: animals.filter((t) => t._id !== id)
                  }
                })
              }}
            />
          </div>
        </Card>
      </div>
      {/* Dialogs */}
      <AddFeederDialog isOpen={showAddFeederDialog} close={() => setShowAddFeederDialog(false)} />
      <AddAnimalDialog
        isOpen={showAddAnimalDialog}
        close={() => setShowAddAnimalDialog(false)}
        updateCache={(d) => {
          client.writeQuery({
            query: GET_ANIMALS,
            variables: { filter: animalSearch },
            data: {
              animals: [
                ...animals,
                d.createAnimal
              ]
            }
          })
        }}
      />
      <AddFeedTimeDialog
        isOpen={showAddFeedTimeDialog}
        close={() => setShowAddFeedTimeDialog(false)}
        feeders={feeders}
      />
      <DeleteAllFeedTimesDialog isOpen={showDeleteAllFeedTimesDialog} close={() => setShowDeleteAllFeedTimesDialog(false)} />
      <Overlay isOpen={firstTimeOverlay} onClose={() => setFirstTimeOverlay(false)}>
        <div className="flex w-screen h-screen justify-center items-center">
          <div className="flex flex-col items-center bg-background rounded p-8 w-1/3">
            <Typography variant="h3">Hello there!</Typography>
            <Typography variant="body" className="mt-2 text-center">
              It looks like this is your first time setting up this application! Please create a habitat to get started.
            </Typography>
            <div className="mt-4"><Button onClick={() => {
              setShowAddHabitatDialog(true)
              setFirstTimeOverlay(false)
            }}>Create a Habitat</Button></div>
          </div>
        </div>
      </Overlay>
      <AddHabitatDialog isOpen={showAddHabitatDialog} close={() => setShowAddHabitatDialog(false)} />
    </div>
  )
}
Dashboard.propTypes = {
  schedule: PropTypes.array,
  scheduleLoading: PropTypes.bool,
  feeders: PropTypes.array,
  feedersLoading: PropTypes.bool,
  animals: PropTypes.array,
  animalSearch: PropTypes.string,
  setAnimalSearch: PropTypes.func,
  animalsLoading: PropTypes.bool,
  habitats: PropTypes.array,
  habitatsLoading: PropTypes.bool,
  client: PropTypes.any
}
Dashboard.defaultProps = {
  schedule: [],
  feeders: [],
  animals: []
}

export default Dashboard
