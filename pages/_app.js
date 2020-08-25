import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from '../components/providers'
import '../public/index.css'

const MyApp = ({ Component, pageProps }) => (
  <ThemeProvider>
    <Component {...pageProps} />
  </ThemeProvider>
)
MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any
}

export default MyApp
