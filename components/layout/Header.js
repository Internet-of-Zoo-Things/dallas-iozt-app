import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import PropTypes from 'prop-types'
import {
  Popover as _Popover, Position, Spinner, Navbar, Alignment
} from '@blueprintjs/core'
import {
  Typography,
  Button,
  StyledLink,
  Tag
} from '../primitives'
import { UserRoles } from '../../utils/models'

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

const NotificationContainer = styled.div`
  ${tw`h-16 w-full p-3 border-b border-background-darker flex items-center`}
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
          <Typography variant="subtitle" weight="bold">BETA</Typography>
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
          <div className="w-64">
            <div className="flex flex-col justify-center items-center">
              {
                notifications.length > 0
                  ? notifications.map((n, i) => (
                    <NotificationContainer key={i}>
                      <Typography variant="icon" icon="envelope" className="mr-2" />
                      <Typography variant="subcurrentPage" className="truncate">
                        {n.message}
                      </Typography>
                    </NotificationContainer>
                  ))
                  : <NotificationContainer>
                    <Typography variant="subcurrentPage">
                      No new notifications!
                    </Typography>
                  </NotificationContainer>
              }
              <NotificationContainer>
                <StyledLink href="/log" className="w-full">
                  <Button fill>
                    Full Logs
                  </Button>
                </StyledLink>
              </NotificationContainer>
            </div>
          </div>
        }
        position={Position.BOTTOM}
        className="h-12"
      />
      <Popover
        target={
          <Button icon="user" />
        }
        content={
          <div className="w-64">
            <div className="flex flex-col justify-center items-center pb-3">
              {
                user
                  ? <>
                    <div className="flex flex-col justify-center items-center my-3">
                      <div className="flex justify-center items-end">
                        <Typography variant="body">
                          { user.name }
                        </Typography>
                        <Typography variant="subcurrentPage" className="text-gray ml-1">
                          ({ user.username })
                        </Typography>
                      </div>
                      <Typography variant="subcurrentPage" className="text-gray mt-1">
                        { UserRoles[user.role].name }
                      </Typography>
                    </div>
                    <Button minimal fill icon="cog">
                      Settings
                    </Button>
                    <Button minimal fill intent="danger" icon="log-out">
                      Sign Out
                    </Button>
                  </>
                  : <Spinner />
              }
            </div>
          </div>
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
