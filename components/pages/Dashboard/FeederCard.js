import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Typography, Button, Card } from '../../primitives'

const IconButton = styled(Button)`
  ${tw`w-12 h-12`}
`

const FeederCard = ({ name, status, ...props }) => (
  <Card
    header={
      <div className="flex px-6 py-3 bg-primary w-full justify-center">
        <Typography variant="body" className="text-white">
          { name ? name.toUpperCase() : undefined }
        </Typography>
      </div>
    }
    {...props}
  >
    <div className="flex flex-col justify-center items-center">
      <Typography variant="h3" weight="thin" className="truncate">{status}</Typography>
      <div className="flex flex-row pt-3">
        <div className="px-2">
          <IconButton icon="cell-tower" />
        </div>
        <div className="px-2">
          <IconButton icon="trash" intent="danger" />
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
