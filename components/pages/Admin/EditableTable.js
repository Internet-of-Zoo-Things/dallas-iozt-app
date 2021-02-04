import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextInput, Button } from '../../primitives'

const validator = {
  number: (val) => val.replace(/[^\d.]/g, ''),
  string: (val) => val
}

const _ = ({
  updateFunc, updating, state, setState, listData
}) => {
  const [updatingId, setUpdatingId] = useState(null)
  return (
    <table className="bp3-html-table .modifier w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {
          listData.map((c, i) => (
            <tr key={i}>
              <td>{c.name}</td>
              <td>{c.description}</td>
              <td className="flex flex-col justify-center">
                <TextInput
                  clearButton={false}
                  placeholder=""
                  onChange={(e) => {
                    const val = e.target.value
                    setState((prev) => ({ ...prev, [c.name]: validator[typeof c.value](val) }))
                  }}
                  value={state[c.name]}
                />
                {
                  (typeof c.value === 'number' ? parseFloat(state[c.name]) !== c.value : state[c.name] !== c.value) && (
                    <Button
                      minimal
                      className="mt-2"
                      loading={updating && updatingId === c._id}
                      onClick={() => {
                        setUpdatingId(c._id)
                        updateFunc({
                          variables: {
                            _id: c._id,
                            value: typeof c.value === 'number' ? parseFloat(state[c.name]) : state[c.name]
                          }
                        })
                      }}
                    >Save</Button>
                  )
                }
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
_.propTypes = {
  updateFunc: PropTypes.func,
  updating: PropTypes.bool,
  state: PropTypes.object,
  setState: PropTypes.func,
  listData: PropTypes.arrayOf(PropTypes.object)
}

export default _
