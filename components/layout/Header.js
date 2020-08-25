import React from 'react'
import { Typography } from '../primitives'

const _ = () => (
  <div className="flex justify-start items-center bg-primary text-white h-12 px-4">
    {/* left-aligned */}
    <div className="flex flex-grow">
      <Typography variant="h6">Dashboard</Typography>
    </div>
    {/* right-aligned */}
    <div className="flex flex-row">
      icons here
    </div>
  </div>
)

export default _
