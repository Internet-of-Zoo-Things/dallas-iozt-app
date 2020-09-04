import React from 'react'
import PropTypes from 'prop-types'
import {
  Typography, Button, Tag
} from '../../primitives'
import { compareUserRoles } from '../../../utils/functions/ui'
import { UserRoles } from '../../../utils/models'

const FeederCard = ({
  user,
  name,
  type,
  intake,
  ...props
}) => (
  <div className="flex px-2 w-full lg:w-1/2 xl:w-1/2 md:w-full sm:w-full">
    <div className="flex flex-row items-center mt-2 border border-border rounded-lg hover:bg-background w-full overflow-hidden" {...props}>
      <Tag large generateColor>{type}</Tag>
      <div className="flex flex-grow justify-center">
        <Typography variant="subtitle" className="px-2">
          {name}
        </Typography>
        <Typography variant="subtitle" weight="thin" className="px-2">
          ({intake} kg)
        </Typography>
      </div>
      {
        user && compareUserRoles(user.role, UserRoles.VIEWER) > 0
          ? <div>
            <Button minimal intent="primary" icon="edit" onClick={() => {}} />
            <Button minimal intent="danger" icon="cross" onClick={() => {}} />
          </div>
          : null
      }
    </div>
  </div>
)
FeederCard.propTypes = {
  user: PropTypes.object,
  /** Name of the animal */
  name: PropTypes.string.isRequired,
  /** Species of animal */
  type: PropTypes.string.isRequired,
  /** Daily food intake in lbs */
  intake: PropTypes.number.isRequired
}

export default FeederCard
