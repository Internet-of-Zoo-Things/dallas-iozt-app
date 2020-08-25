import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from '../components/providers'

const ThemeDecorator = (storyFn) => (
  <ThemeProvider>
    {storyFn()}
  </ThemeProvider>
)
ThemeDecorator.propTypes = {
  storyFn: PropTypes.any
}

export default ThemeDecorator