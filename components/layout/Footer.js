import React from 'react'
import {
  Typography,
  Tooltip,
  Button,
  StyledLink
} from '../primitives'

const _ = () => (
  <div className="flex flex-row justify-end items-center bg-background-darker text-gray p-4 relative z-10">
    {
      process.env.NODE_ENV !== 'production'
        ? <>
          <div className="mr-2">
            <StyledLink href="https://github.com/Internet-of-Zoo-Things/dallas-iozt-app" external>
              <Button minimal className="h-full" icon="code">View the source</Button>
            </StyledLink>
          </div>
        </>
        : null
    }
    <Tooltip content={
      <div className="p-3 w-48 break-normal text-center">
        <Typography variant="body">
          Please create a new issue at this link and label it as a <strong>Bug</strong>!
        </Typography>
      </div>
    }>
      <div className="">
        <StyledLink href="https://github.com/Internet-of-Zoo-Things/dallas-iozt-app/issues" external>
          <Button minimal className="h-full" icon="warning-sign">Report a bug</Button>
        </StyledLink>
      </div>
    </Tooltip>
  </div>
)

export default _
