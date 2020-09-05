import React from 'react'
import PropTypes from 'prop-types'
import { Dialog } from '@blueprintjs/core'
import { useMutation } from 'react-apollo'
import { UPDATE_ANIMAL } from '../../../utils/graphql/mutations'
import { Form } from '../../primitives'
import { InputTypes } from '../../../utils/models'
import { GET_ANIMALS } from '../../../utils/graphql/queries'

const _ = ({ isOpen, close, data }) => {
  /* api interaction */
  const [updateAnimal, { loading }] = useMutation(UPDATE_ANIMAL, {
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
      title={`Update information for ${data.name}`}
      isOpen={isOpen}
    >
      <div className="w-full p-6">
        <Form
          onSubmit={(d) => {
            updateAnimal({
              variables: {
                _id: data._id,
                name: d.name,
                type: d.type.label,
                intake: parseFloat(d.intake)
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
              placeholder: 'Enter the animal\'s name...',
              defaultValue: data.name
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
              ],
              defaultValue: data.type
            },
            {
              label: 'Daily Food Intake (kg)',
              id: 'intake',
              required: true,
              type: InputTypes.NUMERIC,
              placeholder: 'Enter the daily food intake in lbs...',
              validator: (val) => /^-?\d+\.?\d*$/.test(val) && val > 0,
              defaultValue: data.intake
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
  /** Existing data for animal */
  data: PropTypes.object.isRequired
}

export default _
