import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import PropTypes from 'prop-types'
import { Popover, Position } from '@blueprintjs/core'
import {
  Typography,
  Button,
  StyledLink
} from '../primitives'

const IconButton = styled(Button)`
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  height: 100%;
  
  &:focus {
    box-shadow: none !important;
  }
`

const NotificationContainer = styled.div`
  ${tw`h-16 w-full p-3 border-b border-background-darker flex items-center`}
`

const _ = ({
  title,
  notifications,
  open,
  user
}) => (
  <div className={`flex justify-start items-center bg-primary text-white h-12 px-4 border-b border-primary-darker fixed top-0 right-0 left-${open ? '64' : '16'}`}>
    {/* left-aligned */}
    <div className="flex flex-grow">
      <Typography variant="h6">{title}</Typography>
    </div>
    {/* right-aligned */}
    <div className="flex flex-row h-full">
      <IconButton icon="search" />
      <Popover
        target={
          <IconButton icon="notifications" className="h-12" />
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
          <IconButton icon="user" className="h-12" />
        }
        content={
          <div className="w-64">
            <div className="flex flex-col justify-center items-center pb-3">
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
                  { user.role }
                </Typography>
              </div>
              <Button minimal fill icon="cog">
                Settings
              </Button>
              <Button minimal fill intent="danger" icon="log-out">
                Sign Out
              </Button>
            </div>
          </div>
        }
        position={Position.BOTTOM}
        className="h-12"
      />
    </div>
  </div>
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
  notifications: [],
  open: true
}

export default _
