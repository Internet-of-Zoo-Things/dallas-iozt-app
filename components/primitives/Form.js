import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FormGroup, InputGroup } from '@blueprintjs/core'
import { InputTypes } from '../../utils/models'
import Tooltip from './Tooltip'
import Button from './Button'

const _ = ({
  className,
  fields,
  onSubmit
}) => {
  const [data, setData] = useState({})
  const [showPassword, setShowPassword] = useState({})

  const validate = () => {
    for (let i = 0; i < fields.length; i += 1) {
      const f = fields[i]
      if (f.required && !data[f.id]) return false
      if (f.required && !f.validator) return false
      if (f.validator) {
        if (!f.validator(data[f.id])) return false
      }
    }
    return true
  }

  const renderField = (field) => {
    switch (field.type) {
    case InputTypes.TEXT: return (
      <InputGroup
        id={field.id}
        placeholder={field.placeholder || 'Enter some text...'}
        type="text"
        onChange={(e) => setData((prev) => ({ ...prev, [field.id]: e.target.value }))}
      />
    )
    case InputTypes.PASSWORD: return (
      <InputGroup
        placeholder={field.placeholder}
        rightElement={
          <Tooltip content={`${showPassword ? 'Hide' : 'Show'} Password`}>
            <Button
              icon={showPassword ? 'unlock' : 'lock'}
              minimal={true}
              onClick={() => setShowPassword((prev) => ({ ...prev, [field.id]: !prev[field.id] }))}
            />
          </Tooltip>
        }
        type={showPassword[field.id] ? 'text' : 'password'}
        onChange={(e) => setData((prev) => ({ ...prev, [field.id]: e.target.value }))}
      />
    )
    default: console.error(`Unknown input type "${field.type}"`)
    }
  }

  return (
    <form className={className} onSubmit={(e) => {
      e.preventDefault()
      if (validate()) onSubmit(data)
    }}>
      {
        fields.map((f, i) => (
          <FormGroup
            label={f.label}
            labelFor={f.id}
            labelInfo={f.required ? '(required)' : ''}
            key={i}
          >
            { renderField(f) }
          </FormGroup>
        ))
      }
      <div className="flex w-full justify-end mt-2">
        <Button
          onClick={() => onSubmit(data)}
          text="Submit"
          disabled={!validate()}
        />
      </div>
    </form>
  )
}
_.propTypes = {
  className: PropTypes.string,
  /** list of field metadata */
  fields: PropTypes.array.isRequired,
  /** function to run when form is submitted */
  onSubmit: PropTypes.func.isRequired
}

export default _
