import React from 'react'
import PropTypes from 'prop-types'
import { Dialog } from '@blueprintjs/core'
import { useMutation } from '@apollo/client'
import { Form } from '../../../primitives'
import { InputTypes } from '../../../../utils/models'
import { UPDATE_FEEDER } from '../../../../utils/graphql/mutations'
import { GET_FEEDERS } from '../../../../utils/graphql/queries'

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
      icon="edit"
      onClose={() => close()}
      title={`Refill ${data.name}`}
      isOpen={isOpen}
    >
      <div className="w-full p-6">
        <Form
          onSubmit={(d) => {
            updateFeeder({ variables: { _id: data._id, remaining_percentage: (d.remaining_percentage / 100) } })
          }}
          submitLoading={loading}
          fields={[
            {
              label: 'Feed fill percentage',
              id: 'remaining_percentage',
              required: true,
              type: InputTypes.NUMERIC,
              placeholder: 'Enter a percentage value...',
              helperText: 'Enter a percentage value (20-100) estimating how full the feeder is after refilling',
              defaultValue: 100,
              validator: (v) => parseFloat(v) >= 20 && parseFloat(v) <= 100
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
