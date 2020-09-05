import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from 'react-apollo'
import { Position } from '@blueprintjs/core'
import {
  Typography, Button, Card, Tooltip
} from '../../primitives'
import { FeederStatuses } from '../../../utils/models'
import { capitalize } from '../../../utils/functions/ui'
import { UPDATE_FEEDER } from '../../../utils/graphql/mutations'
import { GET_FEEDERS } from '../../../utils/graphql/queries'
import DeleteFeederDialog from './DeleteFeederDialog'
import UpdateFeederDialog from './UpdateFeederDialog'

const FeederCard = ({
  name, status, _id, description, ...props
}) => {
  const [showDeleteFeederDialog, setShowDeleteFeederDialog] = useState(false)
  const [showUpdateFeederDialog, setShowUpdateFeederDialog] = useState(false)

  const [updateFeeder] = useMutation(UPDATE_FEEDER, {
    onError: (e) => console.error(JSON.stringify(e)),
    refetchQueries: [{ query: GET_FEEDERS }],
    awaitRefetchQueries: true,
    notifyOnNetworkStatusChange: true
  })

  return (
    <>
      <Card
        header={
          <Tooltip content={description} disabled={!description} position={Position.TOP} className="w-full">
            <div
              className={`flex px-6 py-3 w-full justify-center ${status === FeederStatuses.OFFLINE ? 'bg-danger text-white' : 'bg-background'}`}
            >
              <Typography variant="body">
                { name ? name.toUpperCase() : undefined }
              </Typography>
            </div>
          </Tooltip>
        }
        disabled={status === FeederStatuses.DISABLED}
        {...props}
      >
        <div className="flex flex-col justify-center items-center">
          <Typography variant="h5" weight="thin" className="truncate">{capitalize(status)}</Typography>
          <div className="flex flex-row pt-3 justify-around">
            {
              status === FeederStatuses.DISABLED
                ? <Button
                  icon='power'
                  minimal
                  tooltip="Enable this feeder"
                  onClick={() => {
                    updateFeeder({ variables: { _id, status: FeederStatuses.ONLINE } })
                  }}
                />
                : status === FeederStatuses.ONLINE
                  ? <Button
                    icon='disable'
                    minimal
                    tooltip="Disable this feeder (it won't be scheduled in the future)"
                    onClick={() => {
                      updateFeeder({ variables: { _id, status: FeederStatuses.DISABLED } })
                    }}
                  />
                  : null
            }
            <Button icon="edit" minimal onClick={() => setShowUpdateFeederDialog(true)} />
            <Button icon="cell-tower" minimal tooltip="Ping the feeder to check its connection" />
            <Button icon="trash" intent="danger" minimal onClick={() => setShowDeleteFeederDialog(true)} />
          </div>
        </div>
      </Card>
      {/* Dialogs */}
      <DeleteFeederDialog isOpen={showDeleteFeederDialog} close={() => setShowDeleteFeederDialog(false)} data={{ name, _id }} />
      <UpdateFeederDialog isOpen={showUpdateFeederDialog} close={() => setShowUpdateFeederDialog(false)} data={{ _id, name, description }} />
    </>
  )
}
FeederCard.propTypes = {
  /** Name of the feeder */
  name: PropTypes.string,
  /** Status of the feeder */
  status: PropTypes.string,
  /** Optional description for feeder */
  description: PropTypes.string,
  _id: PropTypes.string
}

export default FeederCard
