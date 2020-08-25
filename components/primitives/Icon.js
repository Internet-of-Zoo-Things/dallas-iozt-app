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
  // logo: (props) => renderIconFoundation(<svgs.logo {...props} />)
}

export default Icon
