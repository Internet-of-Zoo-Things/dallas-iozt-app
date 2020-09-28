import React from 'react'
import PropTypes from 'prop-types'
import { Elevation } from '@blueprintjs/core'
import styled from 'styled-components'
import moment from 'moment'
import tw from 'twin.macro'
import { Typography, Card, Tag } from '../../primitives'

const NoWrap = styled.div`
  width: min-content;
  white-space: nowrap;
  ${tw`flex flex-col`}
`

const Log = ({
  logs, loading, filter, setFilter, allTags
}) => (
  <div className="flex flex-col">
    <Card
      header={
        <div className="flex w-full py-3">
          <div className="flex flex-grow ml-6">
            <Typography variant="h4" className="text-dark-gray">Log</Typography>
          </div>
          <div className="mx-6 flex justify-end items-center flex-wrap">
            <Typography variant="subtitle" weight="thin" className="mr-2">Filter logs:</Typography>
            {
              allTags && allTags.map((tag, i) => (
                <Tag
                  generateColor
                  clickable
                  className={`${filter && filter !== tag ? 'opacity-50' : 'opacity-100'} ml-2`}
                  onClick={filter === tag ? undefined : () => setFilter(tag)}
                  onRemove={filter === tag ? () => setFilter(undefined) : undefined}
                  key={i}
                >
                  {tag}
                </Tag>
              ))
            }
          </div>
        </div>
      }
      className={`w-full ${loading && 'bp3-skeleton'}`}
      elevation={Elevation.TWO}
    >
      <div className="m-6">
        <table className="bp3-html-table .modifier w-full">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Username</th>
              <th>Message</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {
              logs.map((log, i) => (
                <tr key={i}>
                  <td>
                    <NoWrap>
                      <Typography variant="subtitle">{moment(log.timestamp).format('MMM Do, hh:mm:ss a')}</Typography>
                      <Typography variant="subtitle" className="text-gray">{moment(log.timestamp).fromNow()}</Typography>
                    </NoWrap>
                  </td>
                  <td>
                    <NoWrap>
                      {log.username}
                    </NoWrap>
                  </td>
                  <td className="break-normal">{log.message}</td>
                  <td>
                    <Tag
                      generateColor
                      clickable
                      onClick={() => setFilter(log.tag)}
                    >
                      {log.tag}
                    </Tag>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </Card>
  </div>
)
Log.propTypes = {
  /** List of system logs */
  logs: PropTypes.array,
  loading: PropTypes.bool,
  /** Filter log results */
  filter: PropTypes.string,
  setFilter: PropTypes.func,
  /** All tag filter options */
  allTags: PropTypes.array
}
Log.defaultProps = {
  logs: []
}

export default Log
