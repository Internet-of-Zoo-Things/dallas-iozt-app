import React from 'react'
import PropTypes from 'prop-types'
import { Dialog } from '@blueprintjs/core'
import { useMutation } from 'react-apollo'
import { Form } from '../../../primitives'
import { InputTypes, FeederStatuses } from '../../../../utils/models'
import { CREATE_FEED_TIME } from '../../../../utils/graphql/mutations'
import { GET_FEED_TIMES } from '../../../../utils/graphql/queries'

const _ = ({ isOpen, close, feeders }) => {
  /* api interaction */
  const [createFeedTime, { loading }] = useMutation(CREATE_FEED_TIME, {
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
            createFeedTime({ variables: { ...d, feeder: d.feeder.id } })
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
                feeders.filter((f) => f.status === FeederStatuses.ONLINE).map((f) => ({ label: f.name, id: f._id }))
            },
            {
              label: 'Food Quantity (s)',
              id: 'quantity',
              required: true,
              type: InputTypes.INTAKE,
              placeholder: 'Enter amount of seconds to dispense food',
              validator: (val) => /^-?\d+\.?\d*$/.test(val) && val > 0
            },
            {
              label: 'Time',
              id: 'timestamp',
              required: true,
              type: InputTypes.DATETIME,
              defaultValue: new Date()
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
