import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Router from 'next/router'
import { Spinner } from '@blueprintjs/core'
import Footer from './Footer'
import Header from './Header'
import { Typography } from '../primitives'

const _ = ({
  loading,
  loadingMessage,
  children,
  title,
  error,
  user
}) => {
  if (error) {
    console.error(error)
    const code = error.networkError ? error.networkError.statusCode : 500
    const msg = error.networkError && error.networkError.result.errors.length !== 0
      ? error.networkError.result.errors[0].message
      : error.toString()
    Router.push(`/_error?code=${code}&msg=${encodeURI(msg)}`)
    return <></>
  }

  return (
    <>
      <Head>
        <title>{title || 'Page'} | IoZT</title>
      </Head>
      <div className="flex flex-col w-screen min-h-screen justify-between bg-background">
        <div>
          <Header user={user} />
          { loading
            ? <Spinner className="flex items-center h-full justify-center">
              <Typography variant="subtitle">{ loadingMessage || 'Loading...' }</Typography>
            </Spinner>
            : <div className="container px-4 flex flex-col">
              { children }
            </div>
          }
        </div>
        <Footer user={user} />
      </div>
    </>
  )
}
_.propTypes = {
  /** Page content */
  children: PropTypes.object,
  /** Page title set in browser */
  title: PropTypes.string,
  /** Indicates whether the layout is loading */
  loading: PropTypes.bool,
  /** Optional message to display while loading */
  loadingMessage: PropTypes.string,
  /* Classname for children */
  className: PropTypes.string,
  /** Error object used for error handling */
  error: PropTypes.object,
  /** Currently signed-in user */
  user: PropTypes.object
}

export default _
