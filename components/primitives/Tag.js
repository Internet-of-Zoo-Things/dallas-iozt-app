/* eslint-disable no-bitwise */
import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Tag } from '@blueprintjs/core'
import { generateColorObj } from '../../utils/functions/ui'

const makeDarker = (val) => ((val - 70 > 0) ? val - 70 : 0)

const Styled_ = styled(Tag)`
  ${({ color }) => color && css`
      background-color: rgb(${color.r}, ${color.g}, ${color.b}, 0.3);
      color: rgb(${makeDarker(color.r)}, ${makeDarker(color.g)}, ${makeDarker(color.b)}, 1) !important;
      /* background-image: linear-gradient(141deg, rgba(${color.r}, ${color.g}, ${color.b}, .3) 0%, rgba(${color.r}, ${color.g}, ${color.b}, .5) 51%, rgba(${color.r}, ${color.g}, ${color.b}, .8) 75%); */
  `}
`

const _ = ({
  generateColor,
  children,
  clickable,
  className,
  ...props
}) => (
  <Styled_
    color={generateColor ? generateColorObj(`${children} hey wanna hear a udp joke? i don't care if you don't get it`) : undefined}
    className={`whitespace-no-wrap ${clickable ? 'cursor-pointer' : ''} ${className}`}
    {...props}
  >
    { children }
  </Styled_>
)
_.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /** generate a random muted color based on the children */
  generateColor: PropTypes.bool,
  /** if the tag can be clicked/removed */
  clickable: PropTypes.bool,
  /** function to run when tag is removed */
  onRemove: PropTypes.func
}

export default _
