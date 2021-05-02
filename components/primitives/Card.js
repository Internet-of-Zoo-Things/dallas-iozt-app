import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import tw from 'twin.macro'
import { Card } from '@blueprintjs/core'

const Styled_ = styled(Card)`
  &&& {
    ${tw`p-0`}
  }
`

const _ = ({
  children, header, disabled, ...props
}) => (
  <Styled_ {...props}>
    {
      header
        ? <div className={`flex border-b border-background-darker ${disabled ? 'opacity-50' : ''}`}>
          {header}
        </div>
        : null
    }
    <div className={`${header && (Array.isArray(children)) ? 'pb-4' : 'py-4'} ${disabled ? 'text-disabled' : ''}`}>
      {
        Array.isArray(children) && children.length > 1
          ? children.map((c, i) => (
            <div className={`flex ${i !== 0 ? 'border-t border-background-darker' : ''} py-3`} key={i}>
              <div className="flex w-full px-6">
                {c}
              </div>
            </div>
          ))
          : children
      }
    </div>
  </Styled_>
)
_.propTypes = {
  /** optional label at the top of the card */
  header: PropTypes.any,
  children: PropTypes.any,
  disabled: PropTypes.bool
}

export default _
