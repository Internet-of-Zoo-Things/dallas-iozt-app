import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Router from 'next/router'
import { Spinner } from '@blueprintjs/core'
import Footer from './Footer'
import Header from './Header'
import SideMenu from './SideMenu'
import { Typography } from '../primitives'
import useWindowSize from '../../utils/hooks/useWindowSize'

/* this corresponds to the tailwindcss "small" identifier */
const RESIZE_WIDTH = 768

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

  const window = useWindowSize()
  const [open, setOpen] = useState(window.width > RESIZE_WIDTH || !window.width)

  useEffect(() => {
    setOpen(window.width > RESIZE_WIDTH)
  }, [window])

  return (
    <>
      <Head>
        <title>{title || 'Page'} | IoZT</title>
      </Head>
      <div className="flex flex-row w-screen h-screen">
        <SideMenu open={open} setOpen={setOpen} />
        <div className="flex flex-col flex-grow justify-between bg-background overflow-y-scroll">
          <div>
            <div className="mb-12">
              <Header user={user} title={title} notifications={[{ message: 'This is a test notification!' }]} open={open} />
            </div>
            { loading
              ? <Spinner className="flex items-center h-full justify-center">
                <Typography variant="subtitle">{ loadingMessage || 'Loading...' }</Typography>
              </Spinner>
              : <div className="px-6 py-6 flex flex-col">
                { children }
              </div>
            }
          </div>
          <Footer user={user} />
        </div>
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
