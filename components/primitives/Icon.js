import React from 'react'
import * as svgs from '../icons'

function renderIconFoundation(component) {
  return (
    <span className="bp3-icon bp3-icon-application">
      {component}
    </span>
  )
}
const Icon = {
  // Custom svg icons
  // Elephant: (props) => renderIconFoundation(<svgs.Elephant {...props} />)
  Snooze: (props) => renderIconFoundation(<svgs.Snooze {...props} />)
}

export default Icon
