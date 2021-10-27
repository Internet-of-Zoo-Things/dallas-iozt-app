import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  FormGroup, InputGroup, NumericInput, Spinner
} from '@blueprintjs/core'
import { DatePicker } from '@blueprintjs/datetime'
import moment from 'moment'
import { useQuery } from '@apollo/client'
import { InputTypes } from '../../utils/models'
import { capitalize } from '../../utils/functions/ui'
import Tooltip from './Tooltip'
import Button from './Button'
import { Select, SelectItem } from './Select'
import { GET_INTAKE_DEFAULTS } from '../../utils/graphql/queries'

const validateEmail = (val) => (
  // eslint-disable-next-line no-control-regex
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(val)
)

const _ = ({
  className,
  fields,
  onSubmit,
  submitLoading
}) => {
  const [data, setData] = useState({})
  const [showPassword, setShowPassword] = useState({})

  useEffect(() => {
    if (!Object.keys(data).length) {
      // Initialize fields
      const tmp = {}
      fields.forEach((f) => {
        if (f.defaultValue) {
          if (f.type === InputTypes.SELECT) {
            const vals = f.items.filter((item) => item.value === (typeof f.defaultValue === 'object' ? f.defaultValue.value : f.defaultValue))
            tmp[f.id] = vals.length === 1
              ? vals[0]
              : undefined && console.error(`Unknown value ${f.defaultValue} of options ${f.items.map((item) => item.label)}`)
          } else {
            tmp[f.id] = f.defaultValue
          }
        } else if ([InputTypes.TEXT, InputTypes.EMAIL, InputTypes.PASSWORD].includes(f.type)) {
          tmp[f.id] = ''
        }
      })
      setData(tmp)
    }
  }, [fields])

  const validate = () => {
    for (let i = 0; i < fields.length; i += 1) {
      const f = fields[i]
      if (f.required && !data[f.id]) return false
      if (f.required && !f.validator) {
        if (f.type === InputTypes.EMAIL && !validateEmail(data[f.id])) return false
      }
      if (data[f.id] && f.validator) {
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
        autoFocus={field.autoFocus}
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
        autoFocus={field.autoFocus}
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
        autoFocus={field.autoFocus}
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
        autoFocus={field.autoFocus}
      >
        <Button
          outline
          rightIcon="caret-down"
          text={(data[field.id] && data[field.id].label) || field.placeholder || 'Select an option'}
        />
      </Select>
    )
    case InputTypes.NUMERIC: return (
      <NumericInput
        id={field.id}
        placeholder={field.placeholder || 'Enter a numeric value...'}
        defaultValue={field.defaultValue}
        onValueChange={(e) => {
          const tmp = e
          setData((prev) => ({ ...prev, [field.id]: tmp }))
        }}
        buttonPosition="none"
        fill
        autoFocus={field.autoFocus}
        {...field.props}
      />
    )
    case InputTypes.DATETIME: return (
      <DatePicker
        id={field.id}
        className='justify-center'
        defaultValue={field.defaultValue || new Date()}
        minDate={new Date()} // disable dates prior to Today
        maxDate={moment().add(2, 'weeks').toDate()} // enable dates thru Dec 31, 1 year in the future
        highlightCurrentDay={true}
        showActionsBar={true}
        todayButtonText='Today'
        canClearSelection={true}
        clearButtonText='Clear'
        timePrecision='minute'
        timePickerProps={{
          showArrowButtons: 'showTimeArrowButtons',
          useAmPm: true
        }}
        onChange={(e) => {
          const tmp = e
          setData((prev) => ({ ...prev, [field.id]: tmp }))
        }}
        autoFocus={field.autoFocus}
      />
    )
    case InputTypes.INTAKE: {
      const { data: intakeDefaults, loading: intakeDefaultsLoading } = useQuery(GET_INTAKE_DEFAULTS)
      return (
        <div className="flex w-full justify-between">
          {
            intakeDefaultsLoading || !intakeDefaults
              ? <Spinner />
              : <>
                {
                  [...intakeDefaults.defaults].sort((a, b) => a.value - b.value).map((d, i) => (
                    <Button
                      key={i}
                      onClick={() => setData((prev) => ({ ...prev, [field.id]: d.value }))}
                      intent={data[field.id] === d.value ? 'primary' : 'neutral'}
                    >
                      {capitalize(d.name)} ({d.value}s)
                    </Button>
                  ))
                }
                <NumericInput
                  id={field.id}
                  placeholder="Custom amount"
                  defaultValue={field.defaultValue}
                  value={data[field.id]}
                  onValueChange={(e) => {
                    const tmp = e
                    setData((prev) => ({ ...prev, [field.id]: tmp }))
                  }}
                  buttonPosition="none"
                  autoFocus={field.autoFocus}
                  {...field.props}
                />
              </>
          }
        </div>
      )
    }
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
            labelInfo={f.required ? '(required)' : '(optional)'}
            key={i}
            helperText={f.helperText}
          >
            { renderField({ ...f, autoFocus: i === 0 }) }
          </FormGroup>
        ))
      }
      <div className="flex w-full justify-end mt-2">
        <Button
          onClick={() => onSubmit(data)}
          text="Submit"
          disabled={!validate()}
          loading={submitLoading}
          type="submit"
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
  onSubmit: PropTypes.func.isRequired,
  /** set loading state for the submit button */
  submitLoading: PropTypes.bool
}

export default _
