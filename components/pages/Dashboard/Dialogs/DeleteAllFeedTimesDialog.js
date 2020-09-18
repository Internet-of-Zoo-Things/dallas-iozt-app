import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, Classes } from '@blueprintjs/core'
import { Button, Typography } from '../../../primitives'

const _ = ({ isOpen, close }) => {
  /* TODO:  Add api interaction */

  return (
    <Dialog
      icon="trash"
      onClose={() => close()}
      title="Delete All Feed Times"
      isOpen={isOpen}
    >
      <>
        <div className="flex flex-col items-center m-auto p-4">
          {/* Wrapped in another div to keep Typography element inline */}
          <div>Are you sure you want to delete <Typography variant="subtitle" weight="bold">all</Typography> scheduled feed times? This action cannot be undone!</div>
        </div>
        <div className={`${Classes.DIALOG_FOOTER} ml-auto`}>
          <Button intent="primary" className="mr-2" onClick={close}>Cancel</Button>
          {/* TODO:  Add Delete button functionality */}
          <Button intent="danger" onClick={() => {}} loading={false}>Delete</Button>
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
