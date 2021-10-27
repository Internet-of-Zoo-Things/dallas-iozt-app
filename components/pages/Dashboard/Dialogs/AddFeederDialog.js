import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, Spinner } from '@blueprintjs/core'
import { useMutation, useQuery } from '@apollo/client'
import { Form, toast } from '../../../primitives'
import { InputTypes } from '../../../../utils/models'
import { CREATE_FEEDER } from '../../../../utils/graphql/mutations'
import { GET_FEEDERS, GET_HABITATS } from '../../../../utils/graphql/queries'

const _ = ({ isOpen, close }) => {
  /* api interaction */
  const [createFeeder, { loading }] = useMutation(CREATE_FEEDER, {
    onError: (err) => {
      console.error(JSON.stringify(err))
      toast.error({ message: err.message })
    },
    onCompleted: close,
    refetchQueries: [{ query: GET_FEEDERS }],
    awaitRefetchQueries: true,
    notifyOnNetworkStatusChange: true
  })
  const { data: habitats, loading: habitatsLoading } = useQuery(GET_HABITATS)

  return (
    <Dialog
      icon="plus"
      onClose={() => close()}
      title="Add a Feeder"
      isOpen={isOpen}
    >
      <div className="w-full p-6">
        {
          habitatsLoading
            ? <Spinner className="m-auto" />
            : <Form
              onSubmit={(d) => {
                createFeeder({
                  variables: {
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
                  placeholder: 'Enter a name for the feeder (ex: Feeder A)...'
                },
                {
                  label: 'Description',
                  id: 'description',
                  required: false,
                  type: InputTypes.TEXT,
                  placeholder: 'Describe the feeder...'
                },
                {
                  label: 'Habitat',
                  id: 'habitat',
                  required: true,
                  type: InputTypes.SELECT,
                  items: habitats && habitats.habitats.map((h) => ({
                    label: h.name,
                    id: h._id
                  })),
                  placeholder: 'Select a habitat...'
                },
                {
                  label: 'Connectivity ID',
                  id: 'connectivity_id',
                  required: true,
                  type: InputTypes.NUMERIC,
                  placeholder: 'Enter a connectivity ID corresponding to a feeder...',
                  helperText: 'This is a unique ID associated with a physical feeder controller'
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
  close: PropTypes.func.isRequired
}

export default _
