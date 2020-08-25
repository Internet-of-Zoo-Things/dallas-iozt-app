import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const _ = ({ children, href, className }) => (
  <Link passHref href={href}>
    <a className={`no-underline hover:text-black ${className}`}>
      { children }
    </a>
  </Link>
)
_.propTypes = {
  href: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string
}

export default _
