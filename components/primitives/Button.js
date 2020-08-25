import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Button } from '@blueprintjs/core'

const Styled_ = styled(Button)`
  &&& {
    background-image: none;
    ${tw`hover:opacity-75 disabled:opacity-75 outline-none shadow-none`}
    .bp3-icon {
      color: inherit;
    }
    ${(props) => {
    if (props.outline) {
      return tw`text-primary bg-white border border-solid border-primary disabled:hover:bg-white`
    } if (props.minimal) {
      return tw`text-primary hover:opacity-100`
    }
    if (!props.minimal) {
      return tw`text-white bg-primary disabled:hover:bg-primary`
    }
  }}
  }
`

const _ = (props) => <Styled_ {...props} />
_.propTypes = {
  /** Sets background to white with only a border color */
  outline: PropTypes.bool
}

export default _
