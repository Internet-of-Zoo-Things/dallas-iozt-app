import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const _ = ({ children, href }) => (
  <Link passHref href={href}>
    <a className="no-underline hover:text-black">
      { children }
    </a>
  </Link>
)
_.propTypes = {
  href: PropTypes.string,
  children: PropTypes.any
}

export default _
