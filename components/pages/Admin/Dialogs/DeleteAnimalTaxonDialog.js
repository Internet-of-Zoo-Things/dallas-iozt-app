import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, Classes } from '@blueprintjs/core'
import { useMutation } from 'react-apollo'
import { DELETE_ANIMAL_TAXON } from '../../../../utils/graphql/mutations'
import { Button } from '../../../primitives'
import { GET_ANIMAL_TAXONS, GET_ANIMALS } from '../../../../utils/graphql/queries'

const _ = ({
  isOpen, close, data
}) => {
  /* api interaction */
  const [deleteAnimalTaxon, { loading }] = useMutation(DELETE_ANIMAL_TAXON, {
    onError: (e) => console.error(JSON.stringify(e)),
    onCompleted: () => {
      close()
    },
    refetchQueries: () => [{ query: GET_ANIMAL_TAXONS }, { query: GET_ANIMALS }],
    awaitRefetchQueries: true,
    notifyOnNetworkStatusChange: true
  })

  return (
    <Dialog
      icon="trash"
      onClose={() => close()}
      title="Delete Animal Taxon"
      isOpen={isOpen}
    >
      <>
        <div className="flex flex-col items-center m-auto p-4">
          Are you sure you want to delete taxon &quot;{data.name}&quot;? All animals of this taxon will also be deleted!
        </div>
        <div className={`${Classes.DIALOG_FOOTER} ml-auto`}>
          <Button intent="primary" className="mr-2" onClick={close}>Cancel</Button>
          <Button intent="danger" onClick={() => deleteAnimalTaxon({ variables: { _id: data._id } })} loading={loading}>Delete</Button>
        </div>
      </>
    </Dialog>
  )
}
_.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  /** Existing data for animal taxon */
  data: PropTypes.object.isRequired
}

export default _
