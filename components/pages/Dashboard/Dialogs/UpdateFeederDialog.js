import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, Spinner } from '@blueprintjs/core'
import { useMutation, useQuery } from '@apollo/client'
import { Form } from '../../../primitives'
import { InputTypes } from '../../../../utils/models'
import { UPDATE_FEEDER } from '../../../../utils/graphql/mutations'
import { GET_FEEDERS, GET_HABITATS } from '../../../../utils/graphql/queries'

const _ = ({
  isOpen, close, data, onUpdate
}) => {
  /* api interaction */
  const [updateFeeder, { loading }] = useMutation(UPDATE_FEEDER, {
    onError: (e) => console.error(JSON.stringify(e)),
    onCompleted: (d) => {
      onUpdate(d)
      close()
    },
    refetchQueries: [{ query: GET_FEEDERS }],
    awaitRefetchQueries: true,
    notifyOnNetworkStatusChange: true
  })
  const { data: habitats, loading: habitatsLoading } = useQuery(GET_HABITATS)

  return (
    <Dialog
      icon="edit"
      onClose={() => close()}
      title={`Edit ${data.name}`}
      isOpen={isOpen}
    >
      <div className="w-full p-6">
        {
          habitatsLoading
            ? <Spinner className="m-auto" />
            : <Form
              onSubmit={(d) => {
                updateFeeder({
                  variables: {
                    _id: data._id,
                    ...d,
                    habitat: d.habitat.id
                  }
                })
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
                  placeholder: 'Describe the feeder...',
                  defaultValue: data.description
                },
                {
                  label: 'Habitat',
                  id: 'habitat',
                  required: true,
                  type: InputTypes.SELECT,
                  items: habitats && habitats.habitats.map((h) => ({
                    label: h.name,
                    value: h._id
                  })),
                  placeholder: 'Select a habitat...',
                  defaultValue: data.habitat._id
                }
              ]}
            />
        }
      </div>
    </Dialog>
  )
}
_.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired
}

export default _
