import styled from 'styled-components'
import tw from 'twin.macro'
import { FormGroup } from '@blueprintjs/core'

const _ = styled(FormGroup)`
  &&& {
    ${tw`text-primary`}
    
    .bp3-text-muted {
        ${tw`text-primary opacity-75`}
    }

    .bp3-form-helper-text {
        ${tw`text-primary opacity-75`}
    }
  }
`

export default _
