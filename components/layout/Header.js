import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Navbar, Alignment } from '@blueprintjs/core'
import {
  Typography,
  Button,
  StyledLink,
  Tag
} from '../primitives'

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
    href: '/log',
    currentPage: 'Log',
    icon: 'document'
  },
  {
    href: '/admin',
    currentPage: 'Admin',
    icon: 'cog'
  }
]

const _ = ({
  currentPage
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
  </Navbar>
)
_.propTypes = {
  currentPage: PropTypes.string
}

export default _
