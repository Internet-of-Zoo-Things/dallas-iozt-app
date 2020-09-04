import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Button, Card } from '../../primitives'
import { FeederStatuses } from '../../../utils/models'

const FeederCard = ({ name, status, ...props }) => (
  <Card
    header={
      <div
        className={`flex px-6 py-3 w-full justify-center ${status === FeederStatuses.OFFLINE ? 'bg-danger text-white' : 'bg-background'}`}
      >
        <Typography variant="body">
          { name ? name.toUpperCase() : undefined }
        </Typography>
      </div>
    }
    disabled={status === FeederStatuses.DISABLED}
    {...props}
  >
    <div className="flex flex-col justify-center items-center">
      <Typography variant="h5" weight="thin" className="truncate">{status}</Typography>
      <div className="flex flex-row pt-3 justify-around">
        {
          status === FeederStatuses.DISABLED
            ? <Button icon='power' minimal tooltip="Enable this feeder" />
            : status === FeederStatuses.ONLINE
              ? <Button icon='disable' minimal tooltip="Disable this feeder (it won't be scheduled in the future)" />
              : null
        }
        <Button icon="cell-tower" minimal tooltip="Ping the feeder to check its connection" />
        <Button icon="trash" intent="danger" minimal />
      </div>
    </div>
  </Card>
)
FeederCard.propTypes = {
  /** Name of the feeder */
  name: PropTypes.string,
  /** Status of the feeder */
  status: PropTypes.string
}

export default FeederCard
