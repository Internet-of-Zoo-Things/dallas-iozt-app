import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Typography, Button, Tag, Icon
} from '../../primitives'
import { UpdateFeedTimeDialog, DeleteFeedTimeDialog } from './Dialogs'

const FeederTag = ({ children, className }) => (
  <Tag large className={`rounded-md ${className}`}>{ children }</Tag>
)
FeederTag.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string
}

const FeedTimeCard = ({ data }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)

  return (
    <>
      <div className="flex flex-row items-center mt-2 border border-border hover:shadow-md rounded-lg w-full overflow-hidden transition duration-150">
        <FeederTag>{data.feeder.name}</FeederTag>
        <div className="flex flex-grow justify-center overflow-hidden">
          <Typography variant="subtitle" className="ml-3 whitespace-no-wrap">
            {data.quantity} lb{data.quantity === 1 ? '' : 's'}
          </Typography>
          <Typography variant="subtitle" className="ml-1 whitespace-no-wrap" weight="light">
            at
          </Typography>
          <Typography variant="subtitle" className="ml-1 whitespace-no-wrap">
            {moment(data.timestamp).format('h:mm a')}
          </Typography>
          <Typography variant="subtitle" className="ml-2 text-gray hidden sm:block md:block lg:hidden xl:block truncate">
            ({moment(data.timestamp).fromNow()})
          </Typography>
        </div>
        <div className="flex flex-no-wrap">
          <Button minimal intent="primary" onClick={() => {}}>
            <Icon.Snooze />
          </Button>
          <Button minimal intent="primary" icon="edit" onClick={() => setShowEditDialog(true)} />
          <Button minimal intent="danger" icon="cross" onClick={() => setShowDeleteDialog(true)} />
        </div>
      </div>
      {/* Dialogs */}
      <UpdateFeedTimeDialog isOpen={showEditDialog} close={() => setShowEditDialog(false)} data={data} />
      <DeleteFeedTimeDialog isOpen={showDeleteDialog} close={() => setShowDeleteDialog(false)} timestamp={data.timestamp} />
    </>
  )
}
FeedTimeCard.propTypes = {
  data: PropTypes.object.isRequired
}

export default FeedTimeCard
