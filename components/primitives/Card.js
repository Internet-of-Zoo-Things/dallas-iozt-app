import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import tw from 'twin.macro'
import { Card } from '@blueprintjs/core'

const Styled_ = styled(Card)`
  width: 30rem;

  &&& {
    ${tw`p-0`}
  }
`

const _ = ({ children, header, ...props }) => (
  <Styled_ {...props}>
    {
      header
        ? <div className="flex justify-center border-b border-background-darker py-3 text-gray">
          {header}
        </div>
        : null
    }
    <div className="p-4">
      {children}
    </div>
  </Styled_>
)
_.propTypes = {
  /** optional label at the top of the card */
  header: PropTypes.string,
  children: PropTypes.any
}

export default _
