import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, Classes } from '@blueprintjs/core'
import { useMutation } from '@apollo/client'
import moment from 'moment'
import { Button } from '../../../primitives'
import { DELETE_FEED_TIME } from '../../../../utils/graphql/mutations'
import { GET_FEED_TIMES } from '../../../../utils/graphql/queries'

const _ = ({
  isOpen, close, timestamp, id
}) => {
  /* api interaction */
  const [deleteFeedTime, { loading }] = useMutation(DELETE_FEED_TIME, {
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
      title="Delete Feed Time"
      isOpen={isOpen}
    >
      <>
        <div className="flex flex-col items-center m-auto p-4">
          Are you sure you want to delete the scheduled feed at {moment(timestamp).toString()} ({moment(timestamp).fromNow()})?
        </div>
        <div className={`${Classes.DIALOG_FOOTER} ml-auto`}>
          <Button intent="primary" className="mr-2" onClick={close}>Cancel</Button>
          <Button intent="danger" onClick={() => deleteFeedTime({ variables: { _id: id } })} loading={loading}>Delete</Button>
        </div>
      </>
    </Dialog>
  )
}
_.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  /** Time for feeding */
  timestamp: PropTypes.any.isRequired,
  id: PropTypes.string.isRequired
}

export default _
