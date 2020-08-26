import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const _ = ({
  children,
  href,
  external,
  className
}) => (
  !external
    ? <Link passHref href={href}>
      <a className={`no-underline hover:text-black ${className}`}>
        { children }
      </a>
    </Link>
    : <a className={`no-underline hover:text-black ${className}`} href={href} target="_blank" rel="noreferrer">
      { children }
    </a>
)
_.propTypes = {
  href: PropTypes.string,
  children: PropTypes.any,
  /** link is to an external website */
  external: PropTypes.bool,
  className: PropTypes.string
}

export default _
