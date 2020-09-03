import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FormGroup, InputGroup, NumericInput } from '@blueprintjs/core'
import { InputTypes } from '../../utils/models'
import Tooltip from './Tooltip'
import Button from './Button'
import { Select, SelectItem } from './Select'

const validateEmail = (val) => (
  // eslint-disable-next-line no-control-regex
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(val)
)

const _ = ({
  className,
  fields,
  onSubmit
}) => {
  const [data, setData] = useState({})
  const [showPassword, setShowPassword] = useState({})

  useEffect(() => {
    // Initialize fields
    const tmp = {}
    fields.forEach((f) => {
      if ([InputTypes.TEXT, InputTypes.EMAIL, InputTypes.PASSWORD].includes(f.type)) {
        tmp[f.id] = ''
      }
    })
    setData(tmp)
  }, [fields])

  const validate = () => {
    for (let i = 0; i < fields.length; i += 1) {
      const f = fields[i]
      if (f.required && data[f.id] === undefined) return false
      if (f.required && !f.validator) {
        if (f.type === InputTypes.EMAIL && !validateEmail(data[f.id])) return false
      }
      if (f.validator) {
        if (!f.validator(data[f.id])) return false
      }
      if (f.type === InputTypes.EMAIL && !validateEmail(data[f.id])) return false
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
        value={data[field.id]}
        onChange={(e) => {
          const tmp = e.target.value
          setData((prev) => ({ ...prev, [field.id]: tmp }))
        }}
        autoComplete="off"
        fill
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
        value={data[field.id]}
        onChange={(e) => {
          const tmp = e.target.value
          setData((prev) => ({ ...prev, [field.id]: tmp }))
        }}
        autoComplete="off"
        fill
      />
    )
    case InputTypes.EMAIL: return (
      <InputGroup
        id={field.id}
        placeholder={field.placeholder || 'Enter your email address...'}
        type="text"
        value={data[field.id]}
        onChange={(e) => {
          const tmp = e.target.value
          setData((prev) => ({ ...prev, [field.id]: tmp }))
        }}
        fill
      />
    )
    case InputTypes.SELECT: return (
      <Select
        id={field.id}
        filterable={false}
        { ...field.props }
        items={field.items}
        noResults={<SelectItem disabled={true} text="No results." />}
        popoverProps={{ minimal: true }}
        itemRenderer={Select.ItemRenderer}
        itemPredicate={Select.ItemPredicate}
        onItemSelect={(item) => { setData((prev) => ({ ...prev, [field.id]: item })) }}
      >
        <Button
          outline
          secondary
          rightIcon="caret-down"
          text={(data[field.id] && data[field.id].label) || field.placeholder || 'Select an option'}
        />
      </Select>
    )
    case InputTypes.NUMERIC: return (
      <NumericInput
        id={field.id}
        placeholder={field.placeholder || 'Enter a numeric value...'}
        onValueChange={(e) => {
          const tmp = e
          setData((prev) => ({ ...prev, [field.id]: tmp }))
        }}
        buttonPosition="none"
        fill
        {...field.props}
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
