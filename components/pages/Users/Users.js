import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Elevation } from '@blueprintjs/core'
import { Typography, Button, Card } from '../../primitives'
import { UserRoles } from '../../../utils/models'
import RegisterUserDialog from './RegisterUserDialog'
import { compareUserRoles } from '../../../utils/functions/ui'

const Users = ({ user, allUsers }) => {
  const [registerDialog, setRegisterDialog] = useState(false)

  return (
    <div className="flex flex-col">
      {/* buttons */}
      <div className="flex flex-row">
        <Button minimal className="mx-1" onClick={() => setRegisterDialog(true)}>
          <Typography variant="body">Register User</Typography>
        </Button>
      </div>
      {/* user table */}
      <Card className="w-full mt-8" elevation={Elevation.ONE}>
        <table className="bp3-html-table .modifier w-full">
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Name</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {
              allUsers.map((u, i) => (
                <tr key={i}>
                  <td>{u.username}</td>
                  <td>{UserRoles[u.role].name}</td>
                  <td>{u.name}</td>
                  <td>
                    {
                      /* editable for admins or self */
                      compareUserRoles(user.role, UserRoles.ADMIN) >= 0 || u.username === user.username
                        ? <Button minimal icon="edit" />
                        : null
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </Card>
      <RegisterUserDialog isOpen={registerDialog} close={() => setRegisterDialog(false)} />
    </div>
  )
}
Users.propTypes = {
  /** Currently signed-in user */
  user: PropTypes.object,
  /** List of all users */
  allUsers: PropTypes.array
}
Users.defaultProps = {
  allUsers: []
}

export default Users
