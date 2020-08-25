import React from 'react'
import { Typography } from '../primitives'

const _ = (props) => (
  <div {...props}>
    <div className="flex flex-row bg-primary justify-between items-center">
      <Typography variant="body">test header</Typography>
    </div>
  </div>
)

export default _
