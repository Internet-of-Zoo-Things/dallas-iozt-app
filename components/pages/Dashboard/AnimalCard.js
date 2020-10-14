import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Typography, Button, Tag
} from '../../primitives'
import { UpdateAnimalDialog, DeleteAnimalDialog } from './Dialogs'

const AnimalCard = ({
  _id,
  name,
  type,
  intake,
  onDelete,
  onExhibit,
  ...props
}) => {
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <div className="flex w-full outline-none">
      <div className="flex flex-row items-center w-full overflow-hidden outline-none" {...props}>
        <Tag large generateColor>{type}</Tag>
        <div className="flex flex-grow justify-center">
          <Typography variant="subtitle" className="px-2">
            {name}
          </Typography>
          <Typography variant="subtitle" weight="thin" className="px-2 truncate">
            ({intake} lbs/day)
          </Typography>
        </div>
        <div className="flex flex-no-wrap">
          <Button minimal intent="primary" icon="edit" onClick={() => setShowUpdateDialog(true)} />
          <Button minimal intent="danger" icon="cross" onClick={() => setShowDeleteDialog(true)} />
        </div>
      </div>
      {/* Dialogs */}
      <UpdateAnimalDialog
        isOpen={showUpdateDialog}
        close={() => setShowUpdateDialog(false)}
        data={{
          _id, name, type, intake
        }}
      />
      <DeleteAnimalDialog
        isOpen={showDeleteDialog}
        close={() => setShowDeleteDialog(false)}
        data={{
          _id, name, type, intake
        }}
        onSubmit={onDelete}
      />
    </div>
  )
}
AnimalCard.propTypes = {
  /** Name of the animal */
  name: PropTypes.string.isRequired,
  /** Species of animal */
  type: PropTypes.string.isRequired,
  /** Daily food intake in lbs */
  intake: PropTypes.number.isRequired,
  /** id of animal in database */
  _id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onExhibit: PropTypes.bool
}

export default AnimalCard
