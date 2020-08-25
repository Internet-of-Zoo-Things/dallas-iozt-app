import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import PropTypes from 'prop-types'
import { Typography, Button, StyledLink } from '../primitives'
import { withRouter } from 'next/router'

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
  router
}) => {
  const active = router.pathname === href

  return (
    <StyledLink href={href}>
      <div className={active ? 'border-l-4 border-primary' : ''}>
        <div className="w-full h-16 flex items-center px-4 border-b border-background-darker hover:bg-background-darker">
          <div className="pr-4">
            <Typography variant="icon" icon={icon} />
          </div>
          <Typography variant="body" weight={active ? 'bold' : ''}>{title}</Typography>
        </div>
      </div>
    </StyledLink>
  )
}
MenuLink.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  /** router object containing current path */
  router: PropTypes.object
}

const _ = ({ router }) => (
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
      <MenuLink href="/" title="Dashboard" icon="dashboard" router={router} />
      <MenuLink href="/users" title="Users" icon="user" router={router} />
      <MenuLink href="/log" title="Log" icon="document" router={router} />
    </div>
  </div>
)
_.propTypes = {
  /** router object containing current path */
  router: PropTypes.object
}

export default withRouter(_)
