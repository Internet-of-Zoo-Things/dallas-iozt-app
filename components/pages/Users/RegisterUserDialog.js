import React from 'react'
import PropTypes from 'prop-types'
import { Dialog } from '@blueprintjs/core'
import { Form } from '../../primitives'
import { InputTypes } from '../../../utils/models'

const Users = ({ isOpen, close }) => (
  <Dialog
    className=""
    icon="edit"
    onClose={() => close()}
    title="Register a User"
    isOpen={isOpen}
    canOutsideClickClose={false}
  >
    <div className="w-full p-6">
      <Form
        onSubmit={(data) => {
          console.warn(data)
          close()
        }}
        fields={[
          {
            label: 'Username',
            id: 'username',
            required: true,
            type: InputTypes.TEXT,
            placeholder: 'Enter a unique username...'
          },
          {
            label: 'First Name',
            id: 'firstname',
            required: true,
            type: InputTypes.TEXT,
            placeholder: 'Enter your first name...'
          },
          {
            label: 'Last Name',
            id: 'lastname',
            required: true,
            type: InputTypes.TEXT,
            placeholder: 'Enter your last name...'
          },
          {
            label: 'Email',
            id: 'email',
            required: false,
            type: InputTypes.TEXT,
            placeholder: 'Enter your email address...'
          },
          {
            label: 'Password',
            id: 'password-first',
            required: true,
            type: InputTypes.PASSWORD,
            placeholder: 'Enter a secure password...'
          },
          {
            label: 'Password',
            id: 'password-second',
            required: true,
            type: InputTypes.PASSWORD,
            placeholder: 'Type in that same password one more time...'
          }
        ]}
      />
    </div>
  </Dialog>
)
Users.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func
}

export default Users
