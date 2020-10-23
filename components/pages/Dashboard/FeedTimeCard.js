import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Popover, Position } from '@blueprintjs/core'
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

const FeedTimeCard = ({ data, feeders }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)

  return (
    <>
      <div className="flex flex-row items-center mt-2 border border-border hover:shadow-md rounded-lg w-full overflow-hidden transition duration-150 w-full">
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
          <Popover
            content={
              <div className="flex flex-col items-center p-4">
                <Typography variant="body" className="mb-2">Snooze Feeding</Typography>
                <div className="flex">
                  {
                    [5, 10, 15].map((time, i) => (
                      <Button className="mx-1" key={i}>{time} min</Button>
                    ))
                  }
                </div>
              </div>
            }
            position={Position.TOP}
          >
            <Button minimal intent="primary" onClick={() => {}}>
              <Icon.Snooze />
            </Button>
          </Popover>
          <Button minimal intent="primary" icon="edit" onClick={() => setShowEditDialog(true)} />
          <Button minimal intent="danger" icon="cross" onClick={() => setShowDeleteDialog(true)} />
        </div>
      </div>
      {/* Dialogs */}
      <UpdateFeedTimeDialog isOpen={showEditDialog} close={() => setShowEditDialog(false)} data={data} feeders={feeders} />
      <DeleteFeedTimeDialog isOpen={showDeleteDialog} close={() => setShowDeleteDialog(false)} timestamp={data.timestamp} id={data._id} />
    </>
  )
}
FeedTimeCard.propTypes = {
  data: PropTypes.object.isRequired,
  feeders: PropTypes.array.isRequired
}

export default FeedTimeCard
