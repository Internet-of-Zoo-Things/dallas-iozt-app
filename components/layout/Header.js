import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Typography, Button } from '../primitives'

const IconButton = styled(Button)`
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  height: 100%;

  &&& {
    ${tw`hover:bg-primary-darker hover:opacity-100`}
  }
`

const _ = () => (
  <div className="flex justify-start items-center bg-primary text-white h-12 px-4">
    {/* left-aligned */}
    <div className="flex flex-grow">
      <Typography variant="h6">Dashboard</Typography>
    </div>
    {/* right-aligned */}
    <div className="flex flex-row h-full">
      <IconButton icon="search" />
      <IconButton icon="notifications" />
      <IconButton icon="user" />
    </div>
  </div>
)

export default _
