/* eslint-disable indent */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Button } from '@blueprintjs/core'

const Styled_ = styled(Button)`
  &&& {
    background-image: none;
    ${tw`disabled:opacity-75 outline-none shadow-none focus:shadow-outline disabled:focus:shadow-none`}
    .bp3-icon {
      color: inherit;
    }
    ${(props) => {
      if (!props.outline && !props.minimal) {
        /* regular filled button */
        switch (props.intent) {
          case 'primary': {
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
        return tw`text-primary hover:opacity-100`
      }
    }}
  }
`

const _ = (props) => <Styled_ {...props} />
_.propTypes = {
  /** Sets background to white with only a border color */
  outline: PropTypes.bool,
  /** Sets no background or border */
  minimal: PropTypes.bool,
  /** Sets intention of the button */
  intent: PropTypes.oneOf(['primary', 'warning', 'danger'])
}
_.defaultProps = {
  intent: 'primary'
}

export default _
