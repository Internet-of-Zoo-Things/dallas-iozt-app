import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Dialog } from '@blueprintjs/core'
import { useMutation } from 'react-apollo'
import { UPDATE_HABITAT } from '../../../../utils/graphql/mutations'
import { Form, Button } from '../../../primitives'
import { InputTypes } from '../../../../utils/models'
import { GET_HABITATS } from '../../../../utils/graphql/queries'
import DeleteHabitatDialog from './DeleteHabitatDialog'

const _ = ({ isOpen, close, data }) => {
  const [showDeleteHabitatDialog, setShowDeleteHabitatDialog] = useState(false)

  /* api interaction */
  const [updateHabitat, { loading }] = useMutation(UPDATE_HABITAT, {
    onError: (e) => console.error(JSON.stringify(e)),
    onCompleted: close,
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
      <div className="w-full p-6 flex flex-col justify-center">
        <Form
          onSubmit={(d) => {
            updateHabitat({
              variables: { ...d, _id: data._id }
            })
          }}
          submitLoading={loading}
          fields={[
            {
              label: 'Name',
              id: 'name',
              required: true,
              type: InputTypes.TEXT,
              placeholder: 'Enter the name of the habitat...',
              defaultValue: data && data.name
            },
            {
              label: 'Description',
              id: 'description',
              type: InputTypes.TEXT,
              placeholder: 'Enter a description for the habitat...',
              defaultValue: data && data.description
            }
          ]}
        />
        <Button intent="danger" minimal className="mt-3" onClick={() => setShowDeleteHabitatDialog(true)}>Delete Habitat</Button>
      </div>
      <DeleteHabitatDialog isOpen={showDeleteHabitatDialog} close={() => setShowDeleteHabitatDialog(false)} data={data} onSubmit={close} />
    </Dialog>
  )
}
_.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  updateCache: PropTypes.func,
  data: PropTypes.object.isRequired
}

export default _
