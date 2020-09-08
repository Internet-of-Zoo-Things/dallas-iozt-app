import React from 'react'
import PropTypes from 'prop-types'
import { Dialog } from '@blueprintjs/core'
import { Form } from '../../../primitives'

const _ = ({ isOpen, close, data }) => {
  return (
    <Dialog
      icon="edit"
      onClose={() => close()}
      title="Edit feed time"
      isOpen={isOpen}
    >
      <div className="w-full p-6">
        {/* Todo: select feeder from dropdown, change time */}
        <Form
          onSubmit={(d) => {
            // todo
          }}
          submitLoading={false}
          fields={[
          ]}
        />
      </div>
    </Dialog>
  )
}
_.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

export default _
