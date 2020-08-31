import React from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
  Tooltip,
  Button,
  StyledLink
} from '../primitives'

const _ = ({ user }) => (
  <div className="flex flex-row justify-start items-center bg-background-darker text-gray p-4 relative z-10">
    <Typography variant="subtitle" className="flex flex-grow">{user ? `Connected as ${user.name}` : 'Unauthenticated'}</Typography>
    {
      process.env.NODE_ENV !== 'production'
        ? <>
          <div className="mr-2">
            <StyledLink href="https://github.com/Internet-of-Zoo-Things/dallas-iozt-app" external>
              <Button minimal className="h-full" icon="code">View the source</Button>
            </StyledLink>
          </div>
          <Tooltip content={
            <div className="p-3 w-48 break-normal text-center">
              <Typography variant="body">
                Please create a new issue at this link and tag it as a <strong>Bug</strong>!
              </Typography>
            </div>
          }>
            <div className="">
              <StyledLink href="https://github.com/Internet-of-Zoo-Things/dallas-iozt-app/issues" external>
                <Button minimal className="h-full" icon="warning-sign">Report a bug</Button>
              </StyledLink>
            </div>
          </Tooltip>
        </>
        : null
    }
  </div>
)
_.propTypes = {
  /** Currently signed-in user */
  user: PropTypes.object
}

export default _
