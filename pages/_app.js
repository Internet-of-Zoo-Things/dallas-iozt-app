import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { ThemeProvider } from '../components/providers'
import '../public/index.css'

const MyApp = ({ Component, pageProps }) => (
  <ThemeProvider>
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
  </ThemeProvider>
)
MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any
}

export default MyApp
