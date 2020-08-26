import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import PropTypes from 'prop-types'
import { Tooltip } from '@blueprintjs/core'

const Styled_ = styled(Tooltip)`
  &&& {
    .bp3-popover-content {
      ${tw`text-white bg-primary`}
    }

    .bp3-popover-arrow-border {
      ${tw`fill-primary`}
    }

    .bp3-popover-arrow-fill {
      ${tw`fill-primary`}
    }
    
    .bp3-popover-target {
      ${tw`w-full h-full`}
    }
  }
`

const _ = ({ children, ...props }) => (
  <Styled_ usePortal={false} {...props}>
    {children}
  </Styled_>
)
_.propTypes = {
  /** Content being described by Tooltip */
  children: PropTypes.node
}

export default _
