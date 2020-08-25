import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import PropTypes from 'prop-types'
import { Typography, Button, StyledLink } from '../primitives'

const IconButton = styled(Button)`
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  height: 100%;

  &&& {
    ${tw`hover:bg-primary-darker hover:opacity-100`}
  }
`

const Logo = styled.img`
  margin-top: -1rem;
`

const MenuLink = ({
  href,
  icon,
  title,
  active
}) => (
  <StyledLink href={href}>
    <div className="w-full h-12 flex items-center px-4 border-b border-background-darker hover:bg-background-darker">
      <Typography variant="body">{title}</Typography>
    </div>
  </StyledLink>
)
MenuLink.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  /** is the active page */
  active: PropTypes.bool
}

const _ = () => (
  <div className="flex flex-col">
    {/* header */}
    <div className="flex items-center bg-primary text-white h-12 pl-4 w-64 border-b border-r border-primary-darker">
      {/* left-aligned */}
      <div className="flex flex-grow">
        <Logo src={`${process.env.URL}/assets/images/logo.png`} alt="logo" />
      </div>
      {/* right-aligned */}
      <div className="flex flex-row h-full">
        <IconButton icon="menu" />
      </div>
    </div>
    {/* menu links */}
    <div className="flex flex-col flex-grow border-r border-background-darker">
      <MenuLink href="/" title="Dashboard" />
      <MenuLink href="/users" title="Users" />
      <MenuLink href="/log" title="Log" />
    </div>
  </div>
)

export default _
