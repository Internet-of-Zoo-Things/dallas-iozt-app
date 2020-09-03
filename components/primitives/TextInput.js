import React from 'react'
import PropTypes from 'prop-types'
import { InputGroup } from '@blueprintjs/core'
import Button from './Button'

const _ = ({ clearButton, onChange, ...props }) => (
  <InputGroup
    type="text"
    autoComplete="off"
    rightElement={
      clearButton
        ? <Button icon="cross" onClick={() => onChange({ target: { value: '' } })} minimal />
        : undefined
    }
    onChange={onChange}
    {...props}
  />
)
_.propTypes = {
  placeholder: PropTypes.string,
  /** if there should be a button on the right to clear the input */
  clearButton: PropTypes.bool,
  onChange: PropTypes.func.isRequired
}
_.defaultProps = {
  placeholder: 'Start typing here...',
  clearButton: true
}

export default _
