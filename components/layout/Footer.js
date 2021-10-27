import React from 'react'
import { Popover } from '@blueprintjs/core'
import { useQuery } from '@apollo/client'
import {
  Typography,
  Button,
  StyledLink
} from '../primitives'
import { CHECK_SOFTWARE_VERSION } from '../../utils/graphql/queries'

const _ = () => {
  const { data } = useQuery(CHECK_SOFTWARE_VERSION)

  return (
    <div className="flex items-center bg-background-darker text-gray p-4 relative z-10">
      <div className="flex items-center pr-4">
        { data && <Typography variant="subtitle">IoZT version {data.checkSoftwareVersion.version}</Typography> }
      </div>
      <div className="flex flex-grow justify-end items-center pl-4">
        {
          process.env.NODE_ENV !== 'production'
            ? <>
              <div className="mr-2">
                <StyledLink href="/graphql" external>
                  <Button minimal className="h-full" icon="graph">GraphQL Playground</Button>
                </StyledLink>
              </div>
              <div className="mr-2">
                <StyledLink href="https://github.com/Internet-of-Zoo-Things/dallas-iozt-app" external>
                  <Button minimal className="h-full" icon="code">View the source</Button>
                </StyledLink>
              </div>
            </>
            : null
        }
        <Popover content={
          <div className="p-3 w-48 break-normal text-center">
            <Typography variant="body" className="mb-2">
              Please create a new issue at
              <StyledLink href="https://github.com/Internet-of-Zoo-Things/dallas-iozt-app/issues" external className="mx-1 text-primary-darker">
                this link
              </StyledLink>
              and label it as a <strong>Bug</strong>!
            </Typography>
            <Typography variant="subtitle" className="opacity-75">
              <StyledLink href="https://github.com/Internet-of-Zoo-Things/dallas-iozt-app/blob/develop/Report-a-Bug.md" external className="mx-1 text-primary-darker">
                Click here
              </StyledLink>
              for help creating an issue ticket.
            </Typography>
          </div>
        }>
          <Button minimal className="h-full" icon="warning-sign">Report a bug</Button>
        </Popover>
      </div>
    </div>
  )
}

export default _
