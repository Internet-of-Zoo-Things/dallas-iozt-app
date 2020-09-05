import React from 'react'
import PropTypes from 'prop-types'
import { Dialog } from '@blueprintjs/core'
import { useMutation } from 'react-apollo'
import { Form } from '../../primitives'
import { InputTypes } from '../../../utils/models'
import { UPDATE_FEEDER } from '../../../utils/graphql/mutations'
import { GET_FEEDERS } from '../../../utils/graphql/queries'

const _ = ({ isOpen, close, data }) => {
  /* api interaction */
  const [updateFeeder, { loading }] = useMutation(UPDATE_FEEDER, {
    onError: (e) => console.error(JSON.stringify(e)),
    onCompleted: close,
    refetchQueries: [{ query: GET_FEEDERS }],
    awaitRefetchQueries: true,
    notifyOnNetworkStatusChange: true
  })

  return (
    <Dialog
      icon="plus"
      onClose={() => close()}
      title={`Edit ${data.name}`}
      isOpen={isOpen}
    >
      <div className="w-full p-6">
        <Form
          onSubmit={(d) => {
            updateFeeder({ variables: { _id: data._id, ...d } })
          }}
          submitLoading={loading}
          fields={[
            {
              label: 'Feeder Name',
              id: 'name',
              required: true,
              type: InputTypes.TEXT,
              placeholder: 'Enter a name for the feeder (ex: Feeder A)...',
              defaultValue: data.name
            },
            {
              label: 'Description',
              id: 'description',
              required: false,
              type: InputTypes.TEXT,
              placeholder: 'Describe the feeder (optional)...',
              defaultValue: data.description
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
  data: PropTypes.object.isRequired
}

export default _
