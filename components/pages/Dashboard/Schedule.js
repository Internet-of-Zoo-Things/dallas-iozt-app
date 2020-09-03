import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Dialog, Classes } from '@blueprintjs/core'
import { Typography, Button, Tag } from '../../primitives'
import { compareUserRoles } from '../../../utils/functions/ui'
import { UserRoles } from '../../../utils/models'

const FeederTag = ({ children, className }) => (
  <Tag large className={`rounded-md ${className}`}>{ children }</Tag>
)
FeederTag.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string
}

const Schedule = ({ user, schedule }) => {
  const [itemToDelete, setItemToDelete] = useState(null)
  const [itemToEdit, setItemToEdit] = useState(null)

  return (
    <div className="flex flex-col w-full items-center">
      {
        schedule.length !== 0
          ? <>
            {
              schedule.map((s, i) => (
                <div key={i} className="flex flex-row items-center mt-2 border border-border rounded-lg w-full hover:bg-background overflow-hidden">
                  <FeederTag>{s.feeder}</FeederTag>
                  <div className="flex flex-grow justify-center overflow-hidden">
                    <Typography variant="subtitle" className="ml-3 whitespace-no-wrap">
                      {moment(s.timestamp).format('h:mm:ss a')}
                    </Typography>
                    <Typography variant="subtitle" className="ml-2 text-gray hidden sm:block md:block lg:block xl:block truncate">
                      ({moment(s.timestamp).fromNow()})
                    </Typography>
                  </div>
                  {
                    user && compareUserRoles(user.role, UserRoles.VIEWER) > 0
                      ? <div className="flex flex-no-wrap">
                        <Button minimal intent="primary" icon="edit" onClick={() => setItemToEdit(s)} />
                        <Button minimal intent="danger" icon="cross" onClick={() => setItemToDelete(s)} />
                      </div>
                      : null
                  }
                </div>
              ))
            }
            <Button className="mt-2" minimal intent="danger" fill>
              <Typography variant="subtitle">Clear All</Typography>
            </Button>
          </>
          : <Typography variant="body" className="flex w-full justify-center text-gray my-8">No scheduled feeds!</Typography>
      }
      {/* Dialogs */}
      <Dialog
        isOpen={itemToDelete}
        title="Delete Scheduled Feed"
        onClose={() => setItemToDelete(null)}
      >
        <>
          <div className="flex flex-col items-center m-auto p-4">
            Are you sure you want to delete the scheduled feeding for
            <FeederTag className="my-2">{itemToDelete && itemToDelete.feeder}</FeederTag>
            at {moment(itemToDelete && itemToDelete.timestamp).format('MMMM Do, h:mm:ss a')}?
          </div>
          <div className={`${Classes.DIALOG_FOOTER} ml-auto`}>
            <Button intent="primary" className="mr-2" onClick={() => setItemToDelete(null)}>Cancel</Button>
            <Button intent="danger" onClick={() => console.warn('fixme')}>Delete</Button>
          </div>
        </>
      </Dialog>
      <Dialog
        isOpen={itemToEdit}
        title="Edit Scheduled Feed"
        onClose={() => setItemToDelete(null)}
      >
        <>
          <div className="flex flex-col items-center m-auto p-4">
            Todo: select feeder from dropdown, adjust time of feeding, adjust quantity
          </div>
          <div className={`${Classes.DIALOG_FOOTER} ml-auto`}>
            <Button className="mr-2" onClick={() => setItemToEdit(null)}>Cancel</Button>
            <Button intent="primary" onClick={() => console.warn('fixme')}>Save</Button>
          </div>
        </>
      </Dialog>
    </div>
  )
}
Schedule.propTypes = {
  user: PropTypes.object,
  schedule: PropTypes.array
}

export default Schedule
