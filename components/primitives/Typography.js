import React from 'react'
import styled, { css } from 'styled-components'
import { Icon } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import tw from 'twin.macro'

const fontTypes = css`
  ${(props) => props.italic && tw`italic`}
  ${(props) => props.weight === 'hairline' && tw`font-hairline`}
  ${(props) => props.weight === 'thin' && tw`font-thin`}
  ${(props) => props.weight === 'light' && tw`font-light`}
  ${(props) => props.weight === 'bold' && tw`font-bold`}
  ${(props) => props.weight === 'extrabold' && tw`font-extrabold`}
  ${(props) => props.weight === 'black' && tw`font-black`}
`

const H1 = styled.h1`
  ${tw`text-6xl font-medium`}
  ${fontTypes}
`
const H2 = styled.h2`
  ${tw`text-5xl font-medium`}
  ${fontTypes}
`
const H3 = styled.h3`
  ${tw`text-4xl font-medium`}
  ${fontTypes}
`
const H4 = styled.h4`
  ${tw`text-3xl font-medium`}
  ${fontTypes}
`
const H5 = styled.h5`
  ${tw`text-2xl font-medium`}
  ${fontTypes}
`
const H6 = styled.h6`
  ${tw`text-xl font-medium`}
  ${fontTypes}
`
const Body = styled.p`
  ${tw`text-base font-medium`}
  ${fontTypes}
`
const Subtitle = styled.span`
  ${tw`text-sm font-medium`}
  ${fontTypes}
`
const LinkContainer = styled.div`
  ${tw`text-sm`}
  a,a:hover {
    color: inherit;
    text-decoration: none;
  }
  a {
    ${fontTypes}
  }
`
const Code = styled.code`
  ${tw`text-sm font-medium`}
`

const _Icon = ({ className, ...props }) => (
  <Icon className={className} {...props} />
)
_Icon.propTypes = {
  className: PropTypes.string
}

const content = (position, iconProps, text, children) => (
  <>
    { iconProps && position === 'left' && <_Icon {...iconProps} /> }
    { text || children }
    { iconProps && position === 'right' && <_Icon {...iconProps} /> }
  </>
)

const link = ({
  text, children, position, iconProps, className, weight, italic, ...props
}) => (
  <LinkContainer className={className} weight={weight} italic={italic}>
    <a {...props}>{content(position, iconProps, text, children)}</a>
  </LinkContainer>
)

const _ = ({
  variant, text, children, position, iconProps, ...props
}) => {
  switch (true) {
  case variant === 'icon':
    return <_Icon {...props} />
  case variant === 'h1':
    return <H1 {...props}>{content(position, iconProps, text, children)}</H1>
  case variant === 'h2':
    return <H2 {...props}>{content(position, iconProps, text, children)}</H2>
  case variant === 'h3':
    return <H3 {...props}>{content(position, iconProps, text, children)}</H3>
  case variant === 'h4':
    return <H4 {...props}>{content(position, iconProps, text, children)}</H4>
  case variant === 'h5':
    return <H5 {...props}>{content(position, iconProps, text, children)}</H5>
  case variant === 'h6':
    return <H6 {...props}>{content(position, iconProps, text, children)}</H6>
  case variant === 'body':
    return <Body {...props}>{content(position, iconProps, text, children)}</Body>
  case variant === 'link':
    return link({
      text, children, position, iconProps, ...props
    })
  case variant === 'code':
    return <Code {...props}>{content(position, iconProps, text, children)}</Code>
  case variant === 'subtitle':
  default:
    return <Subtitle {...props}>{content(position, iconProps, text, children)}</Subtitle>
  }
}
_.propTypes = {
  /** Type of tag to render (h1, h2, h3, h4, h5, h6, body, paragraph, icon) */
  variant: PropTypes.string.isRequired,
  /** Optional alternative to children prop if only text is being displayed */
  text: PropTypes.string,
  /** Optional React Node to pass into component */
  children: PropTypes.node,
  /** Enables Italic typography */
  italic: PropTypes.bool,
  /** Type of weight to use on font (thin, light, bold, extrabold, black) */
  weight: PropTypes.string,
  /** Decides if icon goes before or after text */
  position: PropTypes.string,
  /** Props defined in blueprintjs icon component. https://blueprintjs.com/docs/#core/components/icon */
  iconProps: PropTypes.object
}
_.defaultProps = {
  position: 'left'
}
link.propTypes = _.propTypes

export default _
