import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, Classes } from '@blueprintjs/core'
import { useMutation } from '@apollo/client'
import { Button, Typography } from '../../../primitives'
import { DELETE_ALL_FEED_TIMES } from '../../../../utils/graphql/mutations'
import { GET_FEED_TIMES } from '../../../../utils/graphql/queries'

const _ = ({ isOpen, close }) => {
  /* api interaction */
  const [deleteAllFeedTimes, { loading }] = useMutation(DELETE_ALL_FEED_TIMES, {
    onError: (e) => console.error(JSON.stringify(e)),
    onCompleted: () => {
      close()
    },
    refetchQueries: () => [{ query: GET_FEED_TIMES }],
    awaitRefetchQueries: true,
    notifyOnNetworkStatusChange: true
  })

  return (
    <Dialog
      icon="trash"
      onClose={() => close()}
      title="Delete All Feed Times"
      isOpen={isOpen}
    >
      <>
        <div className="flex flex-col items-center m-auto p-4">
          <div>Are you sure you want to delete <Typography variant="subtitle" weight="bold">all</Typography> scheduled feed times? This action cannot be undone!</div>
        </div>
        <div className={`${Classes.DIALOG_FOOTER} ml-auto`}>
          <Button intent="primary" className="mr-2" onClick={close}>Cancel</Button>
          <Button intent="danger" onClick={() => deleteAllFeedTimes()} loading={loading}>Delete</Button>
        </div>
      </>
    </Dialog>
  )
}
_.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default _
