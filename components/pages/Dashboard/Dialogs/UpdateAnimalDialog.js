import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, Spinner } from '@blueprintjs/core'
import { useMutation, useQuery } from 'react-apollo'
import { UPDATE_ANIMAL } from '../../../../utils/graphql/mutations'
import { Form } from '../../../primitives'
import { InputTypes } from '../../../../utils/models'
import { GET_ANIMALS, GET_ANIMAL_TAXONS } from '../../../../utils/graphql/queries'

const _ = ({ isOpen, close, data }) => {
  /* api interaction */
  const [updateAnimal, { loading }] = useMutation(UPDATE_ANIMAL, {
    onError: (e) => console.error(JSON.stringify(e)),
    onCompleted: close,
    refetchQueries: [{ query: GET_ANIMALS }],
    awaitRefetchQueries: true,
    notifyOnNetworkStatusChange: true
  })
  const { data: animalTaxons } = useQuery(GET_ANIMAL_TAXONS, {
    onError: (e) => console.error(JSON.stringify(e))
  })

  return (
    <Dialog
      icon="edit"
      onClose={() => close()}
      title={`Update information for ${data.name}`}
      isOpen={isOpen}
    >
      <div className="w-full p-6">
        {
          animalTaxons
            ? <Form
              onSubmit={(d) => {
                updateAnimal({
                  variables: {
                    _id: data._id,
                    name: d.name,
                    type: d.type.value,
                    intake: data.intake
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
                  items: animalTaxons ? animalTaxons.animalTaxons.map((a) => ({ label: a.name, value: a._id })) : [],
                  defaultValue: data.type
                },
                {
                  label: 'Daily Food Intake (s)',
                  id: 'intake',
                  type: InputTypes.NUMERIC,
                  placeholder: 'Enter the daily food intake in s...',
                  validator: (val) => /^-?\d+\.?\d*$/.test(val) && val > 0,
                  defaultValue: data.intake,
                  required: true
                }
              ]}
            />
            : <Spinner className="m-auto" />
        }
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
