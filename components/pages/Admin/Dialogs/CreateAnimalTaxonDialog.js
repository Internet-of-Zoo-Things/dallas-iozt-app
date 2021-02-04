import React from 'react'
import PropTypes from 'prop-types'
import { Dialog } from '@blueprintjs/core'
import { useMutation } from 'react-apollo'
import { CREATE_ANIMAL_TAXON } from '../../../../utils/graphql/mutations'
import { Form } from '../../../primitives'
import { InputTypes } from '../../../../utils/models'
import { GET_ANIMAL_TAXONS } from '../../../../utils/graphql/queries'

const _ = ({ isOpen, close }) => {
  /* api interaction */
  const [createAnimalTaxon, { loading }] = useMutation(CREATE_ANIMAL_TAXON, {
    onError: (e) => console.error(JSON.stringify(e)),
    onCompleted: (d) => {
      close()
    },
    refetchQueries: [{ query: GET_ANIMAL_TAXONS }],
    awaitRefetchQueries: true,
    notifyOnNetworkStatusChange: true
  })

  return (
    <Dialog
      icon="plus"
      onClose={() => close()}
      title="Add an Animal Taxon"
      isOpen={isOpen}
    >
      <div className="w-full p-6">
        <Form
          onSubmit={(data) => {
            createAnimalTaxon({
              variables: data
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
              label: 'Default Daily Food Intake (s)',
              id: 'defaultIntake',
              type: InputTypes.NUMERIC,
              placeholder: 'Enter the daily food intake in s...',
              validator: (val) => /^-?\d+\.?\d*$/.test(val) && val > 0 && val < 60,
              required: true,
              max: 60,
              helperText: 'Enter a number between 1 and 60'
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
