import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Elevation, Spinner } from '@blueprintjs/core'
import { useQuery, useMutation } from 'react-apollo'
import {
  Typography, Button, Card, toast
} from '../../primitives'
import {
  CHECK_SOFTWARE_VERSION, CHECK_FOR_UPDATE, GET_VERSION_HISTORY, GET_UPTIME, GET_DEFAULTS
} from '../../../utils/graphql/queries'
import { UPDATE_DEFAULT } from '../../../utils/graphql/mutations'
import EditableTable from './EditableTable'
import AnimalTaxons from './AnimalTaxons'

const Admin = () => {
  const [defaults, setDefaults] = useState({})

  const { data: webVersion } = useQuery(CHECK_SOFTWARE_VERSION, {
    onError: (err) => toast.error(err),
    fetchPolicy: 'cache-first'
  })
  const { data: webUpdate, error: webUpdateError } = useQuery(CHECK_FOR_UPDATE, {
    onError: (err) => toast.error(err),
    fetchPolicy: 'cache-first'
  })
  const { data: versionHistory } = useQuery(GET_VERSION_HISTORY, {
    onError: (err) => toast.error(err),
    fetchPolicy: 'cache-first'
  })
  const { data: uptime } = useQuery(GET_UPTIME)
  const { data: calibration } = useQuery(GET_DEFAULTS, {
    variables: { type: 'calibration' }
  })
  const [updateDefault, { loading: updating }] = useMutation(UPDATE_DEFAULT, {
    onError: (err) => {
      toast.error({ message: 'Could not update default at this time...' })
      console.error(err)
    },
    onCompleted: () => toast.success({ message: 'Default successfully updated!' }),
    refetchQueries: [{ query: GET_DEFAULTS, variables: { type: 'calibration' } }],
    awaitRefetchQueries: true,
    notifyOnNetworkStatusChange: true
  })

  useEffect(() => {
    if (calibration) {
      const dict = {}
      calibration.defaults.forEach((d) => {
        dict[d.name] = d.value
      })
      setDefaults((prev) => ({ ...prev, ...dict }))
    }
  }, [calibration])

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex flex-col items-center w-full lg:w-1/3 xl:w-1/3 mr-8">
        <Card
          header={
            <div className="flex w-full py-3 px-2 justify-center text-center">
              <Typography variant="h4" className="text-dark-gray">Web Application Overview</Typography>
            </div>
          }
          elevation={Elevation.TWO}
          className="w-full mb-8"
        >
          <div className="flex flex-col items-center">
            <div className="flex flex-wrap">
              <Typography variant="body" weight="bold" className="mr-2">Raspberry Pi Uptime:</Typography>
              <Typography variant="body" className="mr-2">{uptime && (moment().diff(uptime.uptime, 'days'))} days</Typography>
            </div>
            <Typography variant="body" className="text-gray">(started on {uptime && moment(uptime.uptime).format('MMM Do, hh:mm:ss a')})</Typography>
          </div>
        </Card>
        <Card
          header={
            <div className="flex w-full py-3 px-2 justify-center text-center">
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
                  <div className="flex flex-wrap">
                    <Typography variant="body" weight="bold" className="mr-2">Current software version:</Typography>
                    <Typography variant="body" className="mr-2">{webVersion.checkSoftwareVersion.version}</Typography>
                  </div>
                  <div className="flex flex-wrap mb-4">
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
                        <Button
                          className="mt-2"
                          onClick={() => toast.warning({ message: 'Updating through the web interface is not yet supported!' })}
                        >
                          Download Update
                        </Button>
                      </div>
                      : <Typography variant="body" className="text-center">
                        There is no software update available at this time.
                      </Typography>
                  }
                </>
                : webUpdateError
                  ? 'There was an error checking for software updates.'
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
            <div className="flex w-full py-3 px-2 justify-center text-center">
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
      <div className="flex flex-col items-center w-full lg:w-2/3 xl:w-2/3">
        <Card
          header={
            <div className="flex w-full py-3 px-2 justify-center text-center">
              <Typography variant="h4" className="text-dark-gray">Data Parameters</Typography>
            </div>
          }
          elevation={Elevation.TWO}
          className="w-full mb-8"
        >
          <div className="flex flex-col items-center">
            <div className="flex mb-2 px-4 w-full">
              <AnimalTaxons />
            </div>
          </div>
        </Card>
        <Card
          header={
            <div className="flex w-full py-3 px-2 justify-center text-center">
              <Typography variant="h4" className="text-dark-gray">Calibration</Typography>
            </div>
          }
          elevation={Elevation.TWO}
          className="w-full mb-8"
        >
          <div className="flex flex-col items-center">
            <div className="flex flex-col pb-2 px-4 w-full">
              <Typography variant="subtitle" className="text-center pb-2 text-disabled">
                Below are some calibration parameters that can be used to fine-tune this application--don&apos;t change them if you don&apos;t need to!
              </Typography>
              {
                calibration
                  ? <EditableTable
                    updateFunc={updateDefault}
                    updating={updating}
                    state={defaults}
                    listData={calibration.defaults}
                    setState={setDefaults}
                  />
                  : <Spinner className="m-auto" />
              }
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Admin
