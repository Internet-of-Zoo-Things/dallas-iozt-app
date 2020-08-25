import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Typography, Button, Card } from '../../primitives'

const IconButton = styled(Button)`
  ${tw`w-12 h-12`}
`

const FeederCard = ({ name, status }) => (
  <Card header={name ? name.toUpperCase() : undefined}>
    <div className="flex flex-col justify-center items-center">
      <Typography variant="h3" weight="thin">{status}</Typography>
      <div className="flex flex-row pt-3">
        <div className="px-2">
          <IconButton icon="cell-tower" />
        </div>
        <div className="px-2">
          <IconButton icon="trash" />
        </div>
      </div>
    </div>
  </Card>
)
FeederCard.propTypes = {
  /** Name of the feeder */
  name: PropTypes.string,
  /** Status of the feeder */
  status: PropTypes.string
}

export default FeederCard
