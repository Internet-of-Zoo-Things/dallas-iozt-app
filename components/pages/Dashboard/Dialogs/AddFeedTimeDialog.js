import React from 'react'
import PropTypes from 'prop-types'
import { Dialog } from '@blueprintjs/core'
import { Form } from '../../../primitives'
import { InputTypes, FeederStatuses } from '../../../../utils/models'

const _ = ({ isOpen, close, feeders }) => {
  // TODO:  Add api interaction

  return (
    <Dialog
      icon="plus"
      onClose={() => close()}
      title="Schedule a Feed"
      isOpen={isOpen}
    >
      <div className="w-full p-6">
        <Form
          onSubmit={(formData) => {
            // TODO:  Implement form submit to db
            // console.debug('formData: ', JSON.stringify(formData))
          }}
          submitLoading={false}
          fields={[
            {
              label: 'Feeder',
              id: 'feeder',
              required: true,
              type: InputTypes.SELECT,
              placeholder: 'Select Feeder',
              items:
                // Only list feeders that are online
                feeders.filter((f) => f.status === FeederStatuses.ONLINE).map((f) => ({ label: f.name }))
            },
            {
              label: 'Food Quantity (lbs)',
              id: 'quantity',
              required: true,
              type: InputTypes.NUMERIC,
              placeholder: 'Enter amount of food to dispense in lbs',
              validator: (val) => /^-?\d+\.?\d*$/.test(val) && val > 0
            },
            {
              label: 'Time',
              id: 'timestamp',
              required: true,
              type: InputTypes.DATETIME
            }
          ]}
        />
      </div>
    </Dialog>
  )
}
_.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  feeders: PropTypes.array
}
_.defaultProps = {
  feeders: []
}

export default _