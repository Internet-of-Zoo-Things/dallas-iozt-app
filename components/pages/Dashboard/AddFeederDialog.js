import React from 'react'
import PropTypes from 'prop-types'
import { Dialog } from '@blueprintjs/core'
import { Form } from '../../primitives'
import { InputTypes } from '../../../utils/models'

const _ = ({ isOpen, close }) => (
  <Dialog
    icon="plus"
    onClose={() => close()}
    title="Add a Feeder"
    isOpen={isOpen}
  >
    <div className="w-full p-6">
      <Form
        onSubmit={(d) => {
          console.warn('fixme: send to backend!')
          console.warn(d)
          close()
        }}
        fields={[
          {
            label: 'Feeder Name',
            id: 'name',
            required: true,
            type: InputTypes.TEXT,
            placeholder: 'Enter a name for the feeder (ex: Feeder A)...'
          },
          {
            label: 'Description',
            id: 'type',
            required: false,
            type: InputTypes.TEXT,
            placeholder: 'Describe the feeder (optional)...'
          }
        ]}
      />
    </div>
  </Dialog>
)
_.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func
}

export default _
