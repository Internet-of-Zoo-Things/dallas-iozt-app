import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Typography, Button, Tag } from '../../primitives'
import { compareUserRoles } from '../../../utils/functions/ui'
import { UserRoles } from '../../../utils/models'

const Schedule = ({ user, schedule }) => (
  <div className="flex flex-col w-full items-center">
    {
      schedule.map((s, i) => (
        <div key={i} className="flex flex-row items-center mt-2 border border-border rounded-lg w-full hover:bg-background">
          <Tag large>{s.feeder}</Tag>
          <div className="flex flex-grow justify-center">
            <Typography variant="subtitle" className="ml-3">
              {moment(s.timestamp).format('MMM Do, h:mm:ss a')}
            </Typography>
            <Typography variant="subtitle" className="ml-2 text-gray">
              ({moment(s.timestamp).fromNow()})
            </Typography>
          </div>
          {
            user && compareUserRoles(user.role, UserRoles.VIEWER) > 0
              ? <Button minimal intent="danger" className="ml-5" icon="cross" />
              : null
          }
        </div>
      ))
    }
  </div>
)
Schedule.propTypes = {
  user: PropTypes.object,
  schedule: PropTypes.array
}

export default Schedule
