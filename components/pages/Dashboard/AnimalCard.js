import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Popover, Menu, MenuItem, Position
} from '@blueprintjs/core'
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
  ...props
}) => {
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <div className="flex flex-col w-full outline-none">
      <Tag large generateColor className="rounded-t-lg text-center">{name}</Tag>
      <div className="flex flex-row items-center w-full overflow-hidden outline-none" {...props}>
        <div className="flex flex-grow justify-start">
          <Typography variant="subtitle" className="pl-3">
            {type}
          </Typography>
          <Typography variant="subtitle" weight="thin" className="px-1 truncate">
            ({intake}s/day)
          </Typography>
        </div>
        <div className="flex flex-no-wrap">
          <Popover
            target={
              <Button minimal icon="more" intent="neutral" />
            }
            content={
              <Menu>
                <MenuItem text="Edit Animal" icon="edit" onClick={() => setShowUpdateDialog(true)} />
                <MenuItem text="Delete Animal" icon="trash" intent="danger" onClick={() => setShowDeleteDialog(true)} />
              </Menu>
            }
            position={Position.BOTTOM}
          />
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
  /** Daily food intake in s */
  intake: PropTypes.number.isRequired,
  /** id of animal in database */
  _id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  habitat: PropTypes.object
}

export default AnimalCard
