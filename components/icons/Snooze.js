import React from 'react'
import PropTypes from 'prop-types'

const _ = (props) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M12,4c-4.879,0-9,4.121-9,9s4.121,9,9,9s9-4.121,9-9S16.879,4,12,4z M12,20c-3.794,0-7-3.206-7-7s3.206-7,7-7s7,3.206,7,7 S15.794,20,12,20z"></path><path transform="scale(-1) rotate(44.907 10.888 -47.17)" d="M17.37 3.5H21.62V5.5H17.37z"></path><path transform="rotate(134.918 4.495 4.5)" d="M2.378 3.5H6.613V5.5H2.378z"></path><path d="M14.832,10.555c0.204-0.307,0.224-0.701,0.05-1.026S14.369,9,14,9H9v2h3.132l-2.964,4.445 c-0.204,0.307-0.224,0.701-0.05,1.026S9.631,17,10,17h5v-2h-3.132L14.832,10.555z"></path></svg>
)
_.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
}
_.defaultProps = {
  width: '1rem',
  height: '1rem'
}

export default _
