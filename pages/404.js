import React from 'react'
import { ErrorView } from '../components/pages/Errors'

const _404 = () => (
  <ErrorView code={404} msg="Sorry, this page does not exist!" noWrapper />
)

export default _404
