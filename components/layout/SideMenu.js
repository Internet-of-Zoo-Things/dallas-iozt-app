import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { Typography, Button, StyledLink, Tooltip } from '../primitives'
import useWindowSize from '../../utils/hooks/useWindowSize'

/* this corresponds to the tailwindcss "small" identifier */
const RESIZE_WIDTH = 768

const routes = [
  {
    href: '/',
    title: 'Dashboard',
    icon: 'dashboard'
  },
  {
    href: '/users',
    title: 'Users',
    icon: 'user'
  },
  {
    href: '/log',
    title: 'Log',
    icon: 'document'
  }
]

const IconButton = styled(Button)`
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  height: 100%;

  &&& {
    ${tw`hover:bg-primary-darker hover:opacity-100`}
  }

  &:focus {
    box-shadow: none !important;
  }
`

const Logo = styled.img`
  margin-top: -1rem;
`

const LinkContainer = styled.div`
  padding-left: ${({ active }) => (!active ? '4px' : '0')};
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
      <LinkContainer className={`${active ? 'border-l-4 border-primary' : ''}  hover:bg-background-darker`} active={active}>
        <div className="w-full h-16 flex items-center px-4 border-b border-background-darker">
          <div className="pr-4">
            <Typography variant="icon" icon={icon} />
          </div>
          {
            title
              ? <Typography variant="body" weight={active ? 'bold' : ''}>{title}</Typography>
              : null
          }
        </div>
      </LinkContainer>
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

const _ = ({ router }) => {
  const window = useWindowSize()
  const [open, setOpen] = useState(window.width > RESIZE_WIDTH || !window.width)

  useEffect(() => {
    setOpen(window.width > RESIZE_WIDTH)
  }, [window])

  return (
    <div className={`flex flex-col ${open ? 'w-64' : 'w-16'}`}>
      {/* header */}
      <div className={`flex items-center bg-primary text-white h-12 ${open ? 'w-64 pl-4' : 'w-16'} border-b border-r border-primary-darker`}>
        {
          open
            ? <div className="flex flex-grow">
              <Logo src={`${process.env.URL}/assets/images/logo.png`} alt="logo" />
            </div>
            : null
        }
        <div className={`flex flex-row h-full ${!open ? 'w-full' : ''}`}>
          <IconButton icon="menu" onClick={() => setOpen((prev) => (!prev))} className={open ? '' : 'w-full'} />
        </div>
      </div>
      {/* menu links */}
      <div className="flex flex-col flex-grow border-r border-background-darker">
        {
          routes.map((r, i) => (
            <MenuLink href={r.href} title={open ? r.title : null} icon={r.icon} router={router} key={i} />
          ))
        }
      </div>
      {
        process.env.NODE_ENV !== 'production'
          ? <div className="flex w-full h-12">
            <Tooltip content={
              <div className="p-3 w-48 break-normal text-center">
                <Typography variant="body">
                  Please create a new issue at this link and tag it as a <strong>Bug</strong>!
                </Typography>
              </div>
            } className="w-full h-full">
              <div className="w-full h-full">
                <StyledLink href="https://wishlist.web.att.com/ioztapp" external>
                  <Button minimal fill className="h-full">Report a bug</Button>
                </StyledLink>
              </div>
            </Tooltip>
          </div>
          : null
      }
    </div>
  )
}
_.propTypes = {
  /** router object containing current path */
  router: PropTypes.object
}

export default withRouter(_)
