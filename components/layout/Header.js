import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import PropTypes from 'prop-types'
import {
  Popover as _Popover, Position, Navbar, Alignment, Menu, MenuItem, MenuDivider
} from '@blueprintjs/core'
import {
  Typography,
  Button,
  StyledLink,
  Tag
} from '../primitives'

const Popover = styled(_Popover)`
  &&& {
    .bp3-popover-target {
      ${tw`h-12 flex items-center`}
    }
  }
`

const Divider = styled(Navbar.Divider)`
  border-color: #ffffff60;
`

const routes = [
  {
    href: '/',
    currentPage: 'Dashboard',
    icon: 'dashboard'
  },
  {
    href: '/users',
    currentPage: 'Users',
    icon: 'user'
  },
  {
    href: '/log',
    currentPage: 'Log',
    icon: 'document'
  }
]

const _ = ({
  currentPage,
  notifications,
  user
}) => (
  <Navbar className="bg-primary text-white">
    <Navbar.Group align={Alignment.LEFT}>
      <Navbar.Heading className="flex items-center">
        <Typography variant="h6">Dallas Zoo IoT</Typography>
        <Tag className="ml-3 bg-semi-transparent text-gray">
          <Typography variant="subtitle" weight="bold">ALPHA</Typography>
        </Tag>
      </Navbar.Heading>
      <Divider />
      <div className="ml-1 flex">
        {
          routes.map((r, i) => (
            <div className="mx-1" key={i}>
              <StyledLink href={r.href}>
                <Button icon={r.icon} active={currentPage === r.currentPage}>
                  <Typography
                    variant="subcurrentPage"
                    weight={currentPage === r.currentPage ? 'bold' : undefined}
                    className="hidden sm:block md:block lg:block xl:block"
                  >
                    {r.currentPage}
                  </Typography>
                </Button>
              </StyledLink>
            </div>
          ))
        }
      </div>
    </Navbar.Group>
    <Navbar.Group align={Alignment.RIGHT}>
      <Popover
        target={
          <Button icon="notifications" />
        }
        content={
          <Menu className="max-w-xs">
            {
              notifications.length > 0
                ? notifications.map((n, i) => (
                  <MenuItem icon="envelope" text={n.message} multiline key={i} />
                ))
                : <MenuItem text="No new notifications!" disabled />
            }
            <MenuDivider />
            <MenuItem icon="align-left" text="View full log" href="/log" />
          </Menu>
        }
        position={Position.BOTTOM}
        className="h-12"
      />
      <Popover
        target={
          <Button icon="user" />
        }
        content={
          <Menu>
            <MenuDivider title={`${user && user.name} (${user && user.username})`} />
            <MenuItem icon="cog" text="Settings" />
            <MenuItem icon="log-out" text="Sign Out" intent="danger" />
          </Menu>
        }
        position={Position.BOTTOM}
        className="h-12"
      />
    </Navbar.Group>
  </Navbar>
)
_.propTypes = {
  currentPage: PropTypes.string,
  notifications: PropTypes.array,
  user: PropTypes.object
}
_.defaultProps = {
  notifications: []
}

export default _
