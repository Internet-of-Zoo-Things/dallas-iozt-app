import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import PropTypes from 'prop-types'
import {
  Typography,
  Button,
  Popover,
  StyledLink
} from '../primitives'

const IconButton = styled(Button)`
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  height: 100%;
`

const NotificationContainer = styled.div`
  ${tw`h-16 w-full p-3 border-b border-background-darker flex items-center`}
`

const _ = ({ title, notifications, user }) => (
  <div className="flex justify-start items-center bg-primary text-white h-12 px-4 border-b border-primary-darker">
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
        className="h-12"
      />
      <IconButton icon="user" />
    </div>
  </div>
)
_.propTypes = {
  title: PropTypes.string,
  notifications: PropTypes.array,
  user: PropTypes.object
}
_.defaultProps = {
  title: 'Dallas IoZT',
  notifications: []
}

export default _
