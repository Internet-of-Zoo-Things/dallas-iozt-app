import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Popover, Position, Classes } from '@blueprintjs/core'
import { useMutation } from 'react-apollo'
import {
  Typography, Button, Tag, Icon, toast
} from '../../primitives'
import { UpdateFeedTimeDialog, DeleteFeedTimeDialog } from './Dialogs'
import { UPDATE_FEED_TIME } from '../../../utils/graphql/mutations'
import { GET_FEED_TIMES } from '../../../utils/graphql/queries'

const FeederTag = ({ children, className }) => (
  <Tag large className={`rounded-md ${className}`}>{ children }</Tag>
)
FeederTag.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string
}

const FeedTimeCard = ({ data, feeders }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [snoozeAmount, setSnoozeAmount] = useState(null)

  const [updateFeedTime, { loading }] = useMutation(UPDATE_FEED_TIME, {
    onError: (e) => console.error(JSON.stringify(e)),
    onCompleted: () => toast.success({ message: `Feed time was delayed by ${snoozeAmount} minutes!` }),
    refetchQueries: [{ query: GET_FEED_TIMES }],
    awaitRefetchQueries: true,
    notifyOnNetworkStatusChange: true
  })

  return (
    <>
      <div className="flex flex-row items-center mt-2 border border-border hover:shadow-md rounded-lg w-full overflow-hidden transition duration-150 w-full">
        <FeederTag>{data.feeder.name}</FeederTag>
        <div className="flex flex-grow justify-center overflow-hidden">
          <Typography variant="subtitle" className="ml-3 whitespace-no-wrap">
            {data.quantity} sec
          </Typography>
          <Typography variant="subtitle" className="ml-1 whitespace-no-wrap" weight="light">
            at
          </Typography>
          <Typography variant="subtitle" className="ml-1 whitespace-no-wrap">
            {moment(data.timestamp).format('h:mm a')}
          </Typography>
          <Typography variant="subtitle" className="ml-2 text-gray hidden sm:block md:block lg:hidden xl:block truncate">
            ({moment(data.timestamp).fromNow()})
          </Typography>
        </div>
        <div className="flex flex-no-wrap">
          <Popover
            content={
              <div className="flex flex-col items-center p-4">
                <Typography variant="body" className="mb-2">Snooze Feeding</Typography>
                <div className={`flex ${Classes.POPOVER_DISMISS}`}>
                  {
                    [5, 10, 15].map((time, i) => (
                      <Button className="mx-1" key={i} onClick={() => {
                        setSnoozeAmount(time)
                        updateFeedTime({
                          variables: {
                            _id: data._id,
                            timestamp: moment(data.timestamp).add(time, 'minutes').toDate().getTime()
                          }
                        })
                      }} loading={loading && time === snoozeAmount}>{time} min</Button>
                    ))
                  }
                </div>
              </div>
            }
            position={Position.TOP}
          >
            <Button minimal intent="primary" onClick={() => {}}>
              <Icon.Snooze />
            </Button>
          </Popover>
          <Button minimal intent="primary" icon="edit" onClick={() => setShowEditDialog(true)} />
          <Button minimal intent="danger" icon="cross" onClick={() => setShowDeleteDialog(true)} />
        </div>
      </div>
      {/* Dialogs */}
      <UpdateFeedTimeDialog isOpen={showEditDialog} close={() => setShowEditDialog(false)} data={data} feeders={feeders} />
      <DeleteFeedTimeDialog isOpen={showDeleteDialog} close={() => setShowDeleteDialog(false)} timestamp={data.timestamp} id={data._id} />
    </>
  )
}
FeedTimeCard.propTypes = {
  data: PropTypes.object.isRequired,
  feeders: PropTypes.array.isRequired
}

export default FeedTimeCard
