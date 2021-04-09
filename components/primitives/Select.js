import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import tw from 'twin.macro'
import { MenuItem } from '@blueprintjs/core'
import { Select } from '@blueprintjs/select'

/**
 * Styled Menu Item that goes within the Select Component
 */
const StyledMenuItem_ = styled(MenuItem)`
  && {
    width: ${(props) => (props.width)}px;
    ${tw`text-left`}

    .bp3-menu-item-label {
        ${tw`text-primary w-full`}
    }

    &.bp3-active {
        ${tw`bg-primary`}
    }
  }
`

const _MenuItem = (props) => <StyledMenuItem_ {...props} />
_MenuItem.propTypes = {
  /** The width of the select field (default: auto) */
  width: PropTypes.number
}

/**
 * Styled Select
 */
const Styled_ = styled(Select)`
  && {
    .bp3-popover-target {
      width: ${(props) => (props.width)}px;
    }
  }
`

const _ = (props) => <Styled_ {...props} />
_.ItemPredicate = (query, item) => {
  return item.label?.toLowerCase().indexOf(query.toLowerCase()) >= 0
}
_.ItemRenderer = (item, { handleClick, modifiers }) => {
  if (!modifiers.matchesPredicate) {
    return null
  }
  return (
    <_MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      label={item.label}
      key={item.id}
      onClick={handleClick}
      width={modifiers.width}
    />
  )
}
_.propTypes = {
  /** The width of the select field (default: auto) */
  width: PropTypes.number
}

export { _ as Select, _MenuItem as SelectItem }
