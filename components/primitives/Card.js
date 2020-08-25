import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Card } from '@blueprintjs/core'

const Styled_ = styled(Card)`
  &&& {
    ${tw`border border-solid border-gray rounded-lg`}
  }
`

const _ = (props) => <Styled_ {...props} />
_.propTypes = {

}

export default _
