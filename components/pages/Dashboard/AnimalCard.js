import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Typography, Button, Tag
} from '../../primitives'
import { compareUserRoles } from '../../../utils/functions/ui'
import { UserRoles } from '../../../utils/models'
import { UpdateAnimalDialog, DeleteAnimalDialog } from './Dialogs'

const AnimalCard = ({
  user,
  _id,
  name,
  type,
  intake,
  ...props
}) => {
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <div className="flex px-2 w-full lg:w-1/2 xl:w-1/2 md:w-full sm:w-full">
      <div className="flex flex-row items-center mt-2 border border-border rounded-lg hover:bg-background w-full overflow-hidden" {...props}>
        <Tag large generateColor>{type}</Tag>
        <div className="flex flex-grow justify-center">
          <Typography variant="subtitle" className="px-2">
            {name}
          </Typography>
          <Typography variant="subtitle" weight="thin" className="px-2">
            ({intake} lbs/day)
          </Typography>
        </div>
        {
          user && compareUserRoles(user.role, UserRoles.VIEWER) > 0
            ? <div>
              <Button minimal intent="primary" icon="edit" onClick={() => setShowUpdateDialog(true)} />
              <Button minimal intent="danger" icon="cross" onClick={() => setShowDeleteDialog(true)} />
            </div>
            : null
        }
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
      />
    </div>
  )
}
AnimalCard.propTypes = {
  user: PropTypes.object,
  /** Name of the animal */
  name: PropTypes.string.isRequired,
  /** Species of animal */
  type: PropTypes.string.isRequired,
  /** Daily food intake in lbs */
  intake: PropTypes.number.isRequired,
  /** id of animal in database */
  _id: PropTypes.string.isRequired
}

export default AnimalCard
