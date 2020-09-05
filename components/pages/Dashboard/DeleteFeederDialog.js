import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, Classes } from '@blueprintjs/core'
import { useMutation } from 'react-apollo'
import { DELETE_FEEDER } from '../../../utils/graphql/mutations'
import { Button } from '../../primitives'
import { GET_FEEDERS } from '../../../utils/graphql/queries'

const _ = ({ isOpen, close, data }) => {
  /* api interaction */
  const [deleteFeeder, { loading }] = useMutation(DELETE_FEEDER, {
    onError: (e) => console.error(JSON.stringify(e)),
    onCompleted: close,
    refetchQueries: () => [{ query: GET_FEEDERS }],
    awaitRefetchQueries: true,
    notifyOnNetworkStatusChange: true
  })

  return (
    <Dialog
      icon="trash"
      onClose={() => close()}
      title="Delete Feeder"
      isOpen={isOpen}
    >
      <>
        <div className="flex flex-col items-center m-auto p-4">
          Are you sure you want to delete {data.name}? This action cannot be undone!
        </div>
        <div className={`${Classes.DIALOG_FOOTER} ml-auto`}>
          <Button intent="primary" className="mr-2" onClick={close}>Cancel</Button>
          <Button intent="danger" onClick={() => deleteFeeder({ variables: { _id: data._id } })} loading={loading}>Delete</Button>
        </div>
      </>
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
