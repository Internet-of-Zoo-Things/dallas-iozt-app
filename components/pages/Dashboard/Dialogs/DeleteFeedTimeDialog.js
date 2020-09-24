import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, Classes } from '@blueprintjs/core'
import moment from 'moment'
import { Button } from '../../../primitives'

const _ = ({ isOpen, close, timestamp }) => {
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
          <Button intent="danger" onClick={() => {}} loading={false}>Delete</Button>
        </div>
      </>
    </Dialog>
  )
}
_.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  /** Time for feeding */
  timestamp: PropTypes.any.isRequired
}

export default _
