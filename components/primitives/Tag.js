/* eslint-disable no-bitwise */
import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Tag } from '@blueprintjs/core'

const hashCode = (str) => {
  let hash = 0
  let chr

  if (str.length === 0) return hash

  for (let i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash |= 0 // Convert to 32bit integer
  }

  return hash
}

const getColor = (value) => {
  const hash = hashCode(value)
  const r = (hash & 0xFF0000) >> 16
  const g = (hash & 0x00FF00) >> 8
  const b = hash & 0x0000FF

  return { r, g, b }
}

const Styled_ = styled(Tag)`
  ${({ color }) => color && css`
      background-color: rgb(${color.r}, ${color.g}, ${color.b}, 0.5);
      background-image: linear-gradient(141deg, rgba(${color.r}, ${color.g}, ${color.b}, .3) 0%, rgba(${color.r}, ${color.g}, ${color.b}, .5) 51%, rgba(${color.r}, ${color.g}, ${color.b}, .8) 75%);
  `}
`

const _ = ({
  generateColor,
  children,
  ...props
}) => (
  <Styled_ {...props} color={generateColor ? getColor(`${generateColor} wanna hear a udp joke? i don't care if you don't get it`) : undefined}>
    { children }
  </Styled_>
)
_.propTypes = {
  children: PropTypes.node,
  /** generate a random muted color based on the input */
  generateColor: PropTypes.string
}

export default _
