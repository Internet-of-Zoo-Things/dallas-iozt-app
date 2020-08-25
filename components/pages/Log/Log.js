import React from 'react'
import PropTypes from 'prop-types'
import { Elevation } from '@blueprintjs/core'
import styled from 'styled-components'
import moment from 'moment'
import tw from 'twin.macro'
import { Typography, Card } from '../../primitives'

const DateContainer = styled.div`
  width: min-content;
  white-space: nowrap;
  ${tw`flex flex-col`}
`

const Users = ({ logs }) => (
  <div className="flex flex-col">
    {/* user table */}
    <Card className="w-full mt-8" elevation={Elevation.ONE}>
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
                  <DateContainer>
                    <Typography variant="subtitle">{moment(log.timestamp).format()}</Typography>
                    <Typography variant="subtitle" className="text-gray">{moment(log.timestamp).fromNow()}</Typography>
                  </DateContainer>
                </td>
                <td>{log.username}</td>
                <td>{log.message}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </Card>
  </div>
)
Users.propTypes = {
  /** List of system logs */
  logs: PropTypes.object
}
Users.defaultProps = {
  logs: []
}

export default Users
