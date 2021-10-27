import React from 'react'
import PropTypes from 'prop-types'
import { Dialog } from '@blueprintjs/core'
import { useMutation } from '@apollo/client'
import { Form } from '../../../primitives'
import { InputTypes, FeederStatuses } from '../../../../utils/models'
import { UPDATE_FEED_TIME } from '../../../../utils/graphql/mutations'
import { GET_FEED_TIMES } from '../../../../utils/graphql/queries'

const _ = ({
  isOpen, close, data, feeders
}) => {
  /* api interaction */
  const [updateFeedTime, { loading }] = useMutation(UPDATE_FEED_TIME, {
    onError: (e) => console.error(JSON.stringify(e)),
    onCompleted: close,
    refetchQueries: [{ query: GET_FEED_TIMES }],
    awaitRefetchQueries: true,
    notifyOnNetworkStatusChange: true
  })

  return (
    <Dialog
      icon="plus"
      onClose={() => close()}
      title="Schedule a Feed"
      isOpen={isOpen}
    >
      <div className="w-full p-6">
        <Form
          onSubmit={(d) => {
            updateFeedTime({
              variables: {
                _id: data._id,
                ...d,
                feeder: d.feeder.value,
                timestamp: d.timestamp.getTime()
              }
            })
          }}
          submitLoading={loading}
          fields={[
            {
              label: 'Feeder',
              id: 'feeder',
              required: true,
              type: InputTypes.SELECT,
              placeholder: 'Select Feeder',
              items:
                // Only list feeders that are online
                feeders.filter((f) => f.status === FeederStatuses.ONLINE).map((f) => ({ label: f.name, value: f._id })),
              defaultValue: data.feeder._id
            },
            {
              label: 'Food Quantity (s)',
              id: 'quantity',
              required: true,
              type: InputTypes.INTAKE,
              placeholder: 'Enter amount of food to dispense in s',
              validator: (val) => /^-?\d+\.?\d*$/.test(val) && val > 0,
              defaultValue: data.quantity
            },
            {
              label: 'Time',
              id: 'timestamp',
              required: true,
              type: InputTypes.DATETIME,
              defaultValue: new Date(data.timestamp)
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
  data: PropTypes.object.isRequired,
  feeders: PropTypes.array.isRequired
}

export default _
