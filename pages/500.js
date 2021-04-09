import React from 'react'
import { ErrorView } from '../components/pages/Errors'

const _500 = () => (
  <ErrorView code={500} msg="An internal error occurred. Check the program logs for more information." noWrapper />
)

export default _500
