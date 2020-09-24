import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Elevation } from '@blueprintjs/core'
import { Typography, Button, Card } from '../../primitives'
import { UserRoles } from '../../../utils/models'
import RegisterUserDialog from './RegisterUserDialog'
import { compareUserRoles } from '../../../utils/functions/ui'

const Users = ({ user, allUsers, loading }) => {
  const [registerDialog, setRegisterDialog] = useState(false)

  return (
    <div className="flex flex-col">
      <Card
        header={
          <div className="flex w-full py-3">
            <div className="flex flex-grow ml-6">
              <Typography variant="h4" className="text-dark-gray">Users</Typography>
            </div>
            <div className="flex justify-center items-center">
              <Button className="mx-6" icon="add" onClick={() => setRegisterDialog(true)}>
                <Typography variant="body">Register User</Typography>
              </Button>
            </div>
          </div>
        }
        className={`w-full ${loading && 'bp3-skeleton'}`}
        elevation={Elevation.TWO}
      >
        <div className="m-6">
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
                        (compareUserRoles(user.role, UserRoles.ADMIN) >= 0 && u.role !== 'ROOT') || u.username === user.username
                          ? <Button minimal icon="edit" />
                          : null
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </Card>
      <RegisterUserDialog isOpen={registerDialog} close={() => setRegisterDialog(false)} />
    </div>
  )
}
Users.propTypes = {
  /** Currently signed-in user */
  user: PropTypes.object,
  /** List of all users */
  allUsers: PropTypes.array,
  loading: PropTypes.bool
}
Users.defaultProps = {
  allUsers: []
}

export default Users
