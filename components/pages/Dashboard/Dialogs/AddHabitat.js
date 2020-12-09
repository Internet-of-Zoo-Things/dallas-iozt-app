import React from 'react'
import PropTypes from 'prop-types'
import { Dialog } from '@blueprintjs/core'
import { useMutation } from 'react-apollo'
import { CREATE_HABITAT } from '../../../../utils/graphql/mutations'
import { Form } from '../../../primitives'
import { InputTypes } from '../../../../utils/models'
import { GET_HABITATS } from '../../../../utils/graphql/queries'

const _ = ({ isOpen, close, updateCache }) => {
  /* api interaction */
  const [createHabitat, { loading }] = useMutation(CREATE_HABITAT, {
    onError: (e) => console.error(JSON.stringify(e)),
    onCompleted: (d) => {
      // updateCache(d)
      close()
    },
    refetchQueries: [{ query: GET_HABITATS }],
    awaitRefetchQueries: true,
    notifyOnNetworkStatusChange: true
  })

  return (
    <Dialog
      icon="plus"
      onClose={() => close()}
      title="Add an Animal"
      isOpen={isOpen}
    >
      <div className="w-full p-6">
        <Form
          onSubmit={(data) => {
            createHabitat({
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
              placeholder: 'Enter the name of the habitat...'
            },
            {
              label: 'Description',
              id: 'description',
              type: InputTypes.TEXT,
              placeholder: 'Enter a description for the habitat...'
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
  updateCache: PropTypes.func.isRequired
}

export default _
