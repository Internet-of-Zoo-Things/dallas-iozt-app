import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Typography, Button, Tag } from '../../primitives'
import { compareUserRoles } from '../../../utils/functions/ui'
import { UserRoles } from '../../../utils/models'
import { UpdateFeedTimeDialog, DeleteFeedTimeDialog } from './Dialogs'

const FeederTag = ({ children, className }) => (
  <Tag large className={`rounded-md ${className}`}>{ children }</Tag>
)
FeederTag.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string
}

const FeederTimeCard = ({ data, user }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)

  return (
    <>
      <div className="flex flex-row items-center mt-2 border border-border rounded-lg w-full hover:bg-background overflow-hidden">
        <FeederTag>{data.feeder}</FeederTag>
        <div className="flex flex-grow justify-center overflow-hidden">
          <Typography variant="subtitle" className="ml-3 whitespace-no-wrap">
            {data.quantity} lb{data.quantity === 1 ? '' : 's'} at
          </Typography>
          <Typography variant="subtitle" className="ml-1 whitespace-no-wrap">
            {moment(data.timestamp).format('h:mm:ss a')}
          </Typography>
          <Typography variant="subtitle" className="ml-2 text-gray hidden sm:block md:block lg:block xl:block truncate">
            ({moment(data.timestamp).fromNow()})
          </Typography>
        </div>
        {
          user && compareUserRoles(user.role, UserRoles.VIEWER) > 0
            ? <div className="flex flex-no-wrap">
              <Button minimal intent="primary" icon="edit" onClick={() => setShowEditDialog(true)} />
              <Button minimal intent="danger" icon="cross" onClick={() => setShowDeleteDialog(true)} />
            </div>
            : null
        }
      </div>
      {/* Dialogs */}
      <UpdateFeedTimeDialog isOpen={showEditDialog} close={() => setShowEditDialog(false)} data={data} />
      <DeleteFeedTimeDialog isOpen={showDeleteDialog} close={() => setShowDeleteDialog(false)} timestamp={data.timestamp} />
    </>
  )
}
FeederTimeCard.propTypes = {
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default FeederTimeCard
