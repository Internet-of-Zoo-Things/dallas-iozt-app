import React from 'react'
import moment from 'moment'
import { Elevation, Spinner } from '@blueprintjs/core'
import { useQuery } from 'react-apollo'
import { Typography, Button, Card } from '../../primitives'
import { CHECK_SOFTWARE_VERSION, CHECK_FOR_UPDATE } from '../../../utils/graphql/queries'

const Admin = () => {
  const pi_start = moment().subtract(2, 'weeks')
  const update = moment().subtract(1, 'day')

  const { data: webVersion } = useQuery(CHECK_SOFTWARE_VERSION)
  const { data: webUpdate } = useQuery(CHECK_FOR_UPDATE)

  return (
    <div className="flex">
      <div className="flex flex-col items-center w-full md:w-1/2 lg:w-1/3 xl:w-1/3 mr-8">
        <Card
          header={
            <div className="flex w-full py-3 ml-6 justify-center">
              <Typography variant="h4" className="text-dark-gray">Web Application Overview</Typography>
            </div>
          }
          elevation={Elevation.TWO}
          className="w-full mb-8"
        >
          <div className="flex flex-col items-center">
            <div className="flex">
              <Typography variant="body" weight="bold" className="mr-2">Raspberry Pi Uptime:</Typography>
              <Typography variant="body" className="mr-2">{(moment().diff(pi_start, 'days'))} days</Typography>
              <Typography variant="body" className="text-gray">(started on {pi_start.format('MMM Do, hh:mm:ss a')})</Typography>
            </div>
          </div>
        </Card>
        <Card
          header={
            <div className="flex w-full py-3 ml-6 justify-center">
              <Typography variant="h4" className="text-dark-gray">Software Updates</Typography>
            </div>
          }
          elevation={Elevation.TWO}
          className="w-full mb-8"
        >
          <div className="flex flex-col w-full">
            <Typography variant="h6" className="mb-4 text-center">Web Application</Typography>
            {
              webVersion && webUpdate
                ? <>
                  <div className="flex">
                    <Typography variant="body" weight="bold" className="mr-2">Current software version:</Typography>
                    <Typography variant="body" className="mr-2">{webVersion.checkSoftwareVersion.version}</Typography>
                  </div>
                  <div className="flex mb-4">
                    <Typography variant="body" weight="bold" className="mr-2">Latest software update:</Typography>
                    <Typography variant="body" className="mr-2">{update.format('MMM Do, hh:mm:ss a')}</Typography>
                    <Typography variant="body" className="text-gray mr-2">({update.fromNow()})</Typography>
                  </div>
                  {
                    webUpdate.update
                      ? <div className="flex flex-col items-center w-full">
                        <Typography variant="h6" weight="bold" className="text-primary">
                          A software update is available!
                        </Typography>
                        {/* todo: update software somehow */}
                        <Button className="mt-2">
                          Download Update
                        </Button>
                      </div>
                      : <Typography variant="body" className="text-center">
                        There is no software update available at this time.
                      </Typography>
                  }
                </>
                : <Spinner />
            }
          </div>
          <div className="flex flex-col items-center w-full">
            <Typography variant="h6" className="mb-4 text-center">Feeder Controller Service</Typography>
            <Typography variant="body" weight="bold" className="mr-2 text-disabled">COMING SOON</Typography>
          </div>
        </Card>
      </div>
      <div className="flex flex-col items-center w-full md:w-1/2 lg:w-2/3 xl:w-2/3">
        <Card
          header={
            <div className="flex w-full py-3 ml-6 justify-center">
              <Typography variant="h4" className="text-dark-gray">Data Parameters</Typography>
            </div>
          }
          elevation={Elevation.TWO}
          className="w-full mb-8"
        >
          <div className="flex flex-col items-center">
            <div className="flex mb-2">
              <Typography variant="body" weight="bold" className="mr-2 text-disabled">COMING SOON</Typography>
              {/* This will be for updating animal types, alogrithm constants, etc */}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Admin
