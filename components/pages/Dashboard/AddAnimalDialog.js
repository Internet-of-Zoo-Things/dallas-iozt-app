import React from 'react'
import PropTypes from 'prop-types'
import { Dialog } from '@blueprintjs/core'
import { useMutation } from 'react-apollo'
import { CREATE_ANIMAL } from '../../../utils/graphql/mutations'
import { Form } from '../../primitives'
import { InputTypes } from '../../../utils/models'
import { GET_ANIMALS } from '../../../utils/graphql/queries'

const _ = ({ isOpen, close }) => {
  /* api interaction */
  const [createAnimal, { loading }] = useMutation(CREATE_ANIMAL, {
    onError: (e) => console.error(JSON.stringify(e)),
    onCompleted: close,
    refetchQueries: [{ query: GET_ANIMALS }],
    awaitRefetchQueries: true,
    notifyOnNetworkStatusChange: true
  })

  return (
    <Dialog
      icon="plus"
      onClose={() => close()}
      title="Add a Feeder"
      isOpen={isOpen}
    >
      <div className="w-full p-6">
        <Form
          onSubmit={(data) => {
            createAnimal({
              variables: {
                name: data.name,
                type: data.type.label,
                intake: parseFloat(data.intake)
              }
            })
          }}
          submitLoading={loading}
          fields={[
            {
              label: 'Name',
              id: 'name',
              required: true,
              type: InputTypes.TEXT,
              placeholder: 'Enter the animal\'s name...'
            },
            {
              label: 'Species',
              id: 'type',
              required: true,
              type: InputTypes.SELECT,
              placeholder: 'Select the animal\'s species...',
              // fixme: use dynamic list of possible animals from db
              items: [
                { label: 'Elephant' },
                { label: 'Giraffe' },
                { label: 'Monkey' }
              ]
            },
            {
              label: 'Daily Food Intake (lbs)',
              id: 'intake',
              required: true,
              type: InputTypes.NUMERIC,
              placeholder: 'Enter the daily food intake in lbs...',
              validator: (val) => /^-?\d+\.?\d*$/.test(val) && val > 0
            }
          ]}
        />
      </div>
    </Dialog>
  )
}
_.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default _
