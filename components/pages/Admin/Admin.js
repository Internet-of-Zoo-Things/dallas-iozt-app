import React from 'react'
import moment from 'moment'
import { Elevation, Spinner } from '@blueprintjs/core'
import { useQuery } from 'react-apollo'
import {
  Typography, Button, Card, toast
} from '../../primitives'
import { CHECK_SOFTWARE_VERSION, CHECK_FOR_UPDATE, GET_VERSION_HISTORY } from '../../../utils/graphql/queries'

const Admin = () => {
  const pi_start = moment().subtract(2, 'weeks')

  const { data: webVersion } = useQuery(CHECK_SOFTWARE_VERSION, {
    onError: (err) => toast.error(err)
  })
  const { data: webUpdate } = useQuery(CHECK_FOR_UPDATE, {
    onError: (err) => toast.error(err)
  })
  const { data: versionHistory } = useQuery(GET_VERSION_HISTORY, {
    onError: (err) => toast.error(err)
  })

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
            </div>
            <Typography variant="body" className="text-gray">(started on {pi_start.format('MMM Do, hh:mm:ss a')})</Typography>
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
                    <Typography variant="body" className="mr-2">{moment(webVersion.checkSoftwareVersion.date).format('MMM Do, hh:mm:ss a')}</Typography>
                    <Typography variant="body" className="text-gray mr-2">({moment(webVersion.checkSoftwareVersion.date).fromNow()})</Typography>
                  </div>
                  {
                    webUpdate.checkForUpdate.update
                      ? <div className="flex flex-col items-center w-full">
                        <Typography variant="h6" weight="bold" className="text-primary mb-2">
                          A software update is available!
                        </Typography>
                        <Typography variant="subtitle">
                          IoZT version {webUpdate.checkForUpdate.latestVersion.version}, published {moment(webUpdate.checkForUpdate.latestVersion.date).format('MMM Do, hh:mm:ss a')}
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
        <Card
          header={
            <div className="flex w-full py-3 ml-6 justify-center">
              <Typography variant="h4" className="text-dark-gray">Web Application Version History</Typography>
            </div>
          }
          elevation={Elevation.TWO}
          className="w-full mb-8"
        >
          {
            versionHistory
              ? versionHistory.getVersionHistory.map((v, i) => (
                <div key={i} className="flex flex-col w-full">
                  <Typography variant="h6" className="text-center">{v.version}</Typography>
                  <Typography variant="subtitle" className="text-center text-disabled">{moment(v.date).format('MMM Do, hh:mm:ss a')}</Typography>
                  <ul className="list-disc ml-4 mt-2">
                    {
                      v.changes.map((c, j) => (
                        <li key={j}>{c}</li>
                      ))
                    }
                  </ul>
                </div>
              ))
              : <Spinner />
          }
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
