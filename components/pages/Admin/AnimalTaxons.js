import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery, useMutation } from 'react-apollo'
import { Spinner, NumericInput } from '@blueprintjs/core'
import { GET_ANIMAL_TAXONS } from '../../../utils/graphql/queries'
import { TextInput, Button } from '../../primitives'
import { UPDATE_ANIMAL_TAXON, CREATE_ANIMAL_TAXON, DELETE_ANIMAL_TAXON } from '../../../utils/graphql/mutations'
import { DeleteAnimalTaxonDialog } from './Dialogs'

const _ = ({ className }) => {
  const [state, setState] = useState()
  const [updatingId, setUpdatingId] = useState(null)
  const { data } = useQuery(GET_ANIMAL_TAXONS, {
    onCompleted: (d) => {
      const tmp = {}
      d.animalTaxons.forEach((a) => {
        tmp[a._id] = a
      })
      setState(tmp)
    }
  })
  const [createAnimalTaxon, { loading: createLoading }] = useMutation(CREATE_ANIMAL_TAXON)
  const [updateAnimalTaxon, { loading: updateLoading }] = useMutation(UPDATE_ANIMAL_TAXON)
  const [deleteAnimalTaxon, { loading: deleteLoading }] = useMutation(DELETE_ANIMAL_TAXON)
  const [taxonToDelete, setTaxonToDelete] = useState(null)

  return (
    <div className={`flex justify-center w-full ${className}`}>
      {
        data && state
          ? <table className="bp3-html-table .modifier w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Default Intake (seconds)</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {
                data.animalTaxons.map((c, i) => (
                  <tr key={i}>
                    <td>
                      <div className="flex flex-col justify-center w-full">
                        <TextInput
                          clearButton={false}
                          placeholder=""
                          defaultValue={c.name}
                          onChange={(e) => {
                            const name = e.target.value
                            setState((prev) => ({ ...prev, [c._id]: { ...prev[c._id], name } }))
                          }}
                          value={state[c._id].name}
                        />
                        {
                          state[c._id].name !== c.name && (
                            <Button
                              minimal
                              className="mt-2"
                              loading={updateLoading && updatingId.id === c._id && updatingId.field === 'name'}
                              onClick={() => {
                                setUpdatingId({ id: c._id, field: 'name' })
                                updateAnimalTaxon({
                                  variables: {
                                    _id: c._id,
                                    name: state[c._id].name
                                  }
                                })
                              }}
                            >Save</Button>
                          )
                        }
                      </div>
                    </td>
                    <td>
                      <div className="inline-flex flex-col justify-center w-full">
                        <NumericInput
                          defaultValue={c.defaultIntake}
                          onValueChange={(e) => {
                            const defaultIntake = Number.isNaN(e) ? 0 : e
                            setState((prev) => ({ ...prev, [c._id]: { ...prev[c._id], defaultIntake } }))
                          }}
                          value={state[c._id].defaultIntake}
                          fill
                          min={1}
                          max={30}
                        />
                        {
                          parseFloat(state[c._id].defaultIntake) !== c.defaultIntake && (
                            <Button
                              minimal
                              className="mt-2"
                              loading={updateLoading && updatingId.id === c._id && updatingId.field === 'defaultIntake'}
                              onClick={() => {
                                setUpdatingId({ id: c._id, field: 'defaultIntake' })
                                updateAnimalTaxon({
                                  variables: {
                                    _id: c._id,
                                    defaultIntake: parseFloat(state[c._id].defaultIntake)
                                  }
                                })
                              }}
                            >Save</Button>
                          )
                        }
                      </div>
                    </td>
                    <td>
                      <Button icon="cross" intent="danger" minimal onClick={() => setTaxonToDelete(c)} />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          : <Spinner />
      }
      { taxonToDelete && <DeleteAnimalTaxonDialog data={taxonToDelete} isOpen={taxonToDelete !== null} close={() => setTaxonToDelete(null)} /> }
    </div>
  )
}
_.propTypes = {
  className: PropTypes.string
}

export default _
