import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from 'react-apollo'
import { Position } from '@blueprintjs/core'
import {
  Typography, Button, Card, Tooltip, Tag
} from '../../primitives'
import { FeederStatuses } from '../../../utils/models'
import { capitalize } from '../../../utils/functions/ui'
import { UPDATE_FEEDER } from '../../../utils/graphql/mutations'
import { GET_FEEDERS } from '../../../utils/graphql/queries'
import { DeleteFeederDialog, UpdateFeederDialog, RefillFeederDialog } from './Dialogs'

const FeederCard = ({
  name, status, _id, description, habitat, remaining_percentage, ...props
}) => {
  const [showDeleteFeederDialog, setShowDeleteFeederDialog] = useState(false)
  const [showUpdateFeederDialog, setShowUpdateFeederDialog] = useState(false)
  const [showRefillFeederDialog, setShowRefillFeederDialog] = useState(false)

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
          <div className="flex flex-wrap mb-2">
            <Typography
              variant="h5"
              className={remaining_percentage > 0.4 ? '' : remaining_percentage > 0.2 ? 'text-warning' : 'text-danger'}
            >
              {Number.parseFloat(remaining_percentage * 100).toFixed(0)}%
            </Typography>
            <div className="flex flex-col justify-center items-center ml-2">
              <Tooltip content="This is an estimation of the remaining percentage of feed in this feeder.">
                <Typography variant="icon" icon="help" className='text-disabled' />
              </Tooltip>
            </div>
          </div>
          {
            remaining_percentage < 0.4 && (
              <Typography variant="subtitle" className={`px-2 pb-2 text-center ${remaining_percentage > 0.2 ? 'text-warning' : 'text-danger'}`}>
                Looks like this feeder may need a refill! Make sure to top it off and click the &quot;Refill&quot; button below to reset this estimation.
              </Typography>
            )
          }
          <div className="flex flex-wrap">
            <Tag className="mx-1" intent={{ online: 'success', offline: 'danger', disabled: 'neutral' }[status]}>
              {capitalize(status)}
            </Tag>
            <Tag className="mx-1">{habitat.name}</Tag>
          </div>
          <div className="flex flex-row pt-3 justify-around">
            <Tooltip content="Mark this feeder as having been refilled to provide a more accurate estimate of remaining feed.">
              <Button minimal onClick={() => setShowRefillFeederDialog(true)}>Refill</Button>
            </Tooltip>
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
      <UpdateFeederDialog isOpen={showUpdateFeederDialog} close={() => setShowUpdateFeederDialog(false)} data={{
        _id, name, description, habitat
      }} />
      <RefillFeederDialog isOpen={showRefillFeederDialog} close={() => setShowRefillFeederDialog(false)} data={{ name, _id }} />
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
  _id: PropTypes.string,
  habitat: PropTypes.object,
  remaining_percentage: PropTypes.number,
  client: PropTypes.any
}

export default FeederCard
