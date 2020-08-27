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
  StyledLink
} from '../primitives'
import { UserRoles } from '../../utils/models'

const Popover = styled(_Popover)`
  &&& {
    .bp3-popover-target {
      ${tw`h-12 flex items-center`}
    }
  }
`

const Logo = styled.img`
  position: fixed;
  top: -1rem;
  left: 1rem;
  height: 4rem;
`

const NotificationContainer = styled.div`
  ${tw`h-16 w-full p-3 border-b border-background-darker flex items-center`}
`

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

const _ = ({
  title,
  notifications,
  user
}) => (
  <Navbar className="bg-primary text-white">
    <Navbar.Group align={Alignment.LEFT}>
      <Navbar.Heading>Dallas Zoo IoT</Navbar.Heading>
      <Navbar.Divider />
      {
        routes.map((r, i) => (
          <div className="mx-1" key={i}>
            <StyledLink href={r.href}>
              <Button icon={r.icon} active={title === r.title}>
                <Typography variant="subtitle" weight={title === r.title ? 'bold' : undefined}>{r.title}</Typography>
              </Button>
            </StyledLink>
          </div>
        ))
      }
    </Navbar.Group>
    <Navbar.Group align={Alignment.RIGHT}>
      <Button icon="search" />
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
                      <Typography variant="subtitle" className="truncate">
                        {n.message}
                      </Typography>
                    </NotificationContainer>
                  ))
                  : <NotificationContainer>
                    <Typography variant="subtitle">
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
                        <Typography variant="subtitle" className="text-gray ml-1">
                          ({ user.username })
                        </Typography>
                      </div>
                      <Typography variant="subtitle" className="text-gray mt-1">
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

  // <div className="flex justify-start items-center bg-primary text-white h-12 px-4 border-b border-primary-darker fixed top-0 right-0 left-0">
  //   {/* left-aligned */}
  //   <div className="flex flex-grow">
  //     <Logo src={`${process.env.URL}/assets/images/logo.png`} alt="logo" />
  //     {

  //     }
  //   </div>
  //   {/* right-aligned */}
  //   <div className="flex flex-row h-full">
  //     <IconButton icon="search" />
  //     <Popover
  //       target={
  //         <IconButton icon="notifications" className="h-12" />
  //       }
  //       content={
  //         <div className="w-64">
  //           <div className="flex flex-col justify-center items-center">
  //             {
  //               notifications.length > 0
  //                 ? notifications.map((n, i) => (
  //                   <NotificationContainer key={i}>
  //                     <Typography variant="icon" icon="envelope" className="mr-2" />
  //                     <Typography variant="subtitle" className="truncate">
  //                       {n.message}
  //                     </Typography>
  //                   </NotificationContainer>
  //                 ))
  //                 : <NotificationContainer>
  //                   <Typography variant="subtitle">
  //                     No new notifications!
  //                   </Typography>
  //                 </NotificationContainer>
  //             }
  //             <NotificationContainer>
  //               <StyledLink href="/log" className="w-full">
  //                 <Button fill>
  //                   Full Logs
  //                 </Button>
  //               </StyledLink>
  //             </NotificationContainer>
  //           </div>
  //         </div>
  //       }
  //       position={Position.BOTTOM}
  //       className="h-12"
  //     />
  //     <Popover
  //       target={
  //         <IconButton icon="user" className="h-12" />
  //       }
  //       content={
  //         <div className="w-64">
  //           <div className="flex flex-col justify-center items-center pb-3">
  //             {
  //               user
  //                 ? <>
  //                   <div className="flex flex-col justify-center items-center my-3">
  //                     <div className="flex justify-center items-end">
  //                       <Typography variant="body">
  //                         { user.name }
  //                       </Typography>
  //                       <Typography variant="subtitle" className="text-gray ml-1">
  //                         ({ user.username })
  //                       </Typography>
  //                     </div>
  //                     <Typography variant="subtitle" className="text-gray mt-1">
  //                       { UserRoles[user.role].name }
  //                     </Typography>
  //                   </div>
  //                   <Button minimal fill icon="cog">
  //                     Settings
  //                   </Button>
  //                   <Button minimal fill intent="danger" icon="log-out">
  //                     Sign Out
  //                   </Button>
  //                 </>
  //                 : <Spinner />
  //             }
  //           </div>
  //         </div>
  //       }
  //       position={Position.BOTTOM}
  //       className="h-12"
  //     />
  //   </div>
  // </div>
)
_.propTypes = {
  title: PropTypes.string,
  notifications: PropTypes.array,
  user: PropTypes.object,
  /** whether the side menu is open */
  open: PropTypes.bool
}
_.defaultProps = {
  title: 'Dallas IoZT',
  notifications: []
}

export default _
