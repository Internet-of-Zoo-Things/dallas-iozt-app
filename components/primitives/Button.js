/* eslint-disable indent */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Button, Position } from '@blueprintjs/core'
import Tooltip from './Tooltip'

const Styled_ = styled(Button)`
  &&& {
    background-image: none;
    ${tw`disabled:opacity-75 outline-none shadow-none focus:shadow-outline disabled:focus:shadow-none transition duration-150`}
    .bp3-icon {
      color: inherit;
    }
    ${(props) => {
      if (!props.outline && !props.minimal) {
        /* regular filled button */
        switch (props.intent) {
          case 'primary': {
            if (props.active) return tw`text-white bg-primary-darker disabled:hover:bg-primary`
            return tw`text-white bg-primary hover:bg-primary-darker disabled:hover:bg-primary`
          }
          case 'warning': {
            return tw`text-white bg-warning hover:bg-warning-hover disabled:hover:bg-warning`
          }
          case 'danger': {
            return tw`text-white bg-danger hover:bg-danger-hover disabled:hover:bg-danger`
          }
          default: return tw`text-white bg-primary hover:bg-primary-darker disabled:hover:bg-primary`
        }
      }
      if (props.outline) {
        switch (props.intent) {
          case 'primary': {
            return tw`text-primary bg-white border border-solid border-primary disabled:hover:bg-white`
          }
          case 'warning': {
            return tw`text-warning bg-white border border-solid border-warning disabled:hover:bg-white`
          }
          case 'danger': {
            return tw`text-danger bg-white border border-solid border-danger disabled:hover:bg-white`
          }
          default: return tw`text-primary bg-white border border-solid border-primary disabled:hover:bg-white`
        }
      }
      if (props.minimal) {
        switch (props.intent) {
          case 'primary': {
            return tw`text-primary hover:opacity-100 disabled:hover:opacity-75`
          }
          case 'warning': {
            return tw`text-warning hover:opacity-100 disabled:hover:opacity-75`
          }
          case 'danger': {
            return tw`text-danger hover:opacity-100 disabled:hover:opacity-75`
          }
          default: return tw`text-primary hover:opacity-100 disabled:hover:opacity-75`
        }
      }
    }}
  }
`

const _ = ({ outline, ...props }) => {
  // Annoying way to get around DOM "recevied boolean for non-boolean attribute" warnings
  const child = <Styled_ {...props} outline={outline ? 1 : 0} />

  return (
    props.tooltip
      ? <Tooltip content={props.tooltip} position={Position.BOTTOM} {...props.tooltipProps}>
        {child}
      </Tooltip>
      : child
  )
}
_.propTypes = {
  /** Sets background to white with only a border color */
  outline: PropTypes.bool,
  /** Sets no background or border */
  minimal: PropTypes.bool,
  /** Sets intention of the button */
  intent: PropTypes.oneOf(['primary', 'warning', 'danger']),
  /** Sets button to its hover behavior */
  active: PropTypes.bool,
  /** If button is disabled */
  disabled: PropTypes.bool,
  /** Set a tooltip around the button */
  tooltip: PropTypes.node,
  /** Any additional props for the tooltip */
  tooltipProps: PropTypes.object
}
_.defaultProps = {
  intent: 'primary'
}

export default _
