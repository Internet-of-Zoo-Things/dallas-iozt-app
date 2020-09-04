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
    className={status === FeederStatuses.DISABLED ? 'opacity-50' : ''}
    {...props}
  >
    <div className="flex flex-col justify-center items-center">
      <Typography variant="h5" weight="thin" className="truncate">{status}</Typography>
      <div className="flex flex-row pt-3 justify-around">
        {
          status === FeederStatuses.DISABLED
            ? <Button icon='power' minimal />
            : status === FeederStatuses.ONLINE
              ? <Button icon='disable' minimal />
              : null
        }
        <Button icon="cell-tower" minimal />
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
