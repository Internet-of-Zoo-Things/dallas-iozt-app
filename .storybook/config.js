import { addDecorator } from '@storybook/react'
// import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { addParameters } from '@storybook/client-api'
import ThemeDecorator from './ThemeDecorator'
import '../public/index.css'

addDecorator(ThemeDecorator)
/*
addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS
  },
})
*/