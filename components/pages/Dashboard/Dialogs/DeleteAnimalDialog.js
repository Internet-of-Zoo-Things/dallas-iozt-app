import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, Classes } from '@blueprintjs/core'
import { useMutation } from '@apollo/client'
import { DELETE_ANIMAL } from '../../../../utils/graphql/mutations'
import { Button } from '../../../primitives'
import { GET_ANIMALS } from '../../../../utils/graphql/queries'

const _ = ({
  isOpen, close, data, onSubmit
}) => {
  /* api interaction */
  const [deleteAnimal, { loading }] = useMutation(DELETE_ANIMAL, {
    onError: (e) => console.error(JSON.stringify(e)),
    onCompleted: () => {
      onSubmit()
      close()
    },
    refetchQueries: () => [{ query: GET_ANIMALS }],
    awaitRefetchQueries: true,
    notifyOnNetworkStatusChange: true
  })

  return (
    <Dialog
      icon="trash"
      onClose={() => close()}
      title="Delete Animal"
      isOpen={isOpen}
    >
      <>
        <div className="flex flex-col items-center m-auto p-4">
          Are you sure you want to delete {data.name}? This action cannot be undone!
        </div>
        <div className={`${Classes.DIALOG_FOOTER} ml-auto`}>
          <Button intent="primary" className="mr-2" onClick={close}>Cancel</Button>
          <Button intent="danger" onClick={() => deleteAnimal({ variables: { _id: data._id } })} loading={loading}>Delete</Button>
        </div>
      </>
    </Dialog>
  )
}
_.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  /** Existing data for animal */
  data: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default _
