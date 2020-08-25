import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Dialog, FormGroup, InputGroup } from '@blueprintjs/core'
import { Button, Tooltip } from '../../primitives'

const Users = ({ isOpen, close }) => {
  const [showPassword, setShowPassword] = useState(false)

  const lockButton = (
    <Tooltip content={`${showPassword ? 'Hide' : 'Show'} Passwords`}>
      <Button
        icon={showPassword ? 'unlock' : 'lock'}
        minimal={true}
        onClick={() => setShowPassword((prev) => (!prev))}
      />
    </Tooltip>
  )

  return (
    <Dialog
      className=""
      icon="edit"
      onClose={() => close()}
      title="Register a User"
      isOpen={isOpen}
      canOutsideClickClose={false}
    >
      <div className="w-full p-6">
        <form onSubmit={(e) => {
          e.preventDefault()
          /* fixme: check that all fields are complete */
          close()
        }}>
          {/* todo: add validation */}
          <FormGroup
            label="Username"
            labelFor="text-input"
            labelInfo="(required)"
          >
            <InputGroup id="text-input" placeholder="Enter a unique username..." />
          </FormGroup>
          <FormGroup
            label="First Name"
            labelFor="text-input"
            labelInfo="(required)"
          >
            <InputGroup id="text-input" placeholder="Enter your first name..." />
          </FormGroup>
          <FormGroup
            label="Last Name"
            labelFor="text-input"
            labelInfo="(required)"
          >
            <InputGroup id="text-input" placeholder="Enter your last name..." />
          </FormGroup>
          <FormGroup
            label="Email"
            labelFor="text-input"
          >
            <InputGroup id="text-input" placeholder="Enter your email..." />
          </FormGroup>
          <FormGroup
            label="Password"
            labelFor="text-input"
            labelInfo="(required)"
          >
            <InputGroup
              placeholder="Enter your password..."
              rightElement={lockButton}
              type={showPassword ? 'text' : 'password'}
            />
          </FormGroup>
          <FormGroup
            label="Password (again)"
            labelFor="text-input"
            labelInfo="(required)"
          >
            <InputGroup
              placeholder="Enter your password on more time..."
              rightElement={lockButton}
              type={showPassword ? 'text' : 'password'}
            />
          </FormGroup>
          <div className="w-full flex justify-end">
            <Button outline intent="warning" className="mr-2" onClick={close}>Cancel</Button>
            <Button onClick={() => {
              /* fixme: check that all fields are complete */
              close()
            }}>Submit</Button>
          </div>
        </form>
      </div>
    </Dialog>
  )
}
Users.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func
}

export default Users
