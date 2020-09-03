import React from 'react'
import PropTypes from 'prop-types'
import { Elevation } from '@blueprintjs/core'
import styled from 'styled-components'
import moment from 'moment'
import tw from 'twin.macro'
import { Typography, Card } from '../../primitives'

const NoWrap = styled.div`
  width: min-content;
  white-space: nowrap;
  ${tw`flex flex-col`}
`

const Users = ({ logs, loading }) => (
  <div className="flex flex-col">
    <Card
      header={
        <div className="flex w-full py-3">
          <div className="flex flex-grow ml-6">
            <Typography variant="h4" className="text-dark-gray">Log</Typography>
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
            </tr>
          </thead>
          <tbody>
            {
              logs.map((log, i) => (
                <tr key={i}>
                  <td>
                    <NoWrap>
                      <Typography variant="subtitle">{moment(log.timestamp).format()}</Typography>
                      <Typography variant="subtitle" className="text-gray">{moment(log.timestamp).fromNow()}</Typography>
                    </NoWrap>
                  </td>
                  <td>
                    <NoWrap>
                      {log.username}
                    </NoWrap>
                  </td>
                  <td>{log.message}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </Card>
  </div>
)
Users.propTypes = {
  /** List of system logs */
  logs: PropTypes.array,
  loading: PropTypes.bool
}
Users.defaultProps = {
  logs: []
}

export default Users
