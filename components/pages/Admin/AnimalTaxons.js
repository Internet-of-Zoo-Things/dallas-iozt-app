import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useQuery, useMutation } from '@apollo/client'
import { Spinner, NumericInput } from '@blueprintjs/core'
import { GET_ANIMAL_TAXONS } from '../../../utils/graphql/queries'
import { TextInput, Button } from '../../primitives'
import { UPDATE_ANIMAL_TAXON } from '../../../utils/graphql/mutations'
import { DeleteAnimalTaxonDialog, CreateAnimalTaxonDialog } from './Dialogs'

const _ = ({ className }) => {
  const [state, setState] = useState()
  const [updatingId, setUpdatingId] = useState(null)
  const { data, client } = useQuery(GET_ANIMAL_TAXONS)
  const [updateAnimalTaxon, { loading: updateLoading }] = useMutation(UPDATE_ANIMAL_TAXON, {
    refetchQueries: [{ query: GET_ANIMAL_TAXONS }]
  })
  const [taxonToDelete, setTaxonToDelete] = useState(null)
  const [createTaxonDialog, setCreateTaxonDialog] = useState(false)

  useEffect(() => {
    if (data) {
      const tmp = {}
      data.animalTaxons.forEach((a) => {
        tmp[a._id] = a
      })
      setState(tmp)
    }
  }, [data])

  return (
    <div className={`flex flex-col items-center w-full ${className}`}>
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
                          value={state[c._id]?.name}
                        />
                        {
                          state[c._id] && state[c._id].name !== c.name && (
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
                          value={state[c._id]?.defaultIntake}
                          fill
                          min={1}
                          max={30}
                        />
                        {
                          state[c._id] && parseFloat(state[c._id].defaultIntake) !== c.defaultIntake && (
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
      {
        taxonToDelete && (
          <DeleteAnimalTaxonDialog
            data={taxonToDelete}
            isOpen={taxonToDelete !== null}
            close={() => setTaxonToDelete(null)}
            onDelete={(id) => {
              client.writeQuery({
                query: GET_ANIMAL_TAXONS,
                data: {
                  animalTaxons: data?.animalTaxons.filter((a) => a._id !== id)
                }
              })
              const tmp = { ...state }
              delete tmp[id]
              setState(tmp)
            }}
          />
        )
      }
      <CreateAnimalTaxonDialog
        isOpen={createTaxonDialog}
        close={() => setCreateTaxonDialog(null)}
        onCreate={(d) => {
          client.writeQuery({
            query: GET_ANIMAL_TAXONS,
            data: {
              animalTaxons: [...data?.animalTaxons, d]
            }
          })
          setState((prev) => ({ ...prev, [d._id]: d }))
        }}
      />
      <div className="mt-2">
        <Button outline onClick={() => setCreateTaxonDialog(true)}>Create New Animal Taxon</Button>
      </div>
    </div>
  )
}
_.propTypes = {
  className: PropTypes.string
}

export default _
