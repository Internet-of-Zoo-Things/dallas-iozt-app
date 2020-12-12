import React, { useState, useEffect } from 'react'
import {
  DragDropContext, Droppable, Draggable
} from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
import { useMutation } from 'react-apollo'
import { Typography, toast, Button } from '../../primitives'
import AnimalCard from './AnimalCard'
import { UPDATE_ANIMAL } from '../../../utils/graphql/mutations'
import { AddHabitatDialog, UpdateHabitatDialog } from './Dialogs'

const constructState = (animals, habitats) => {
  const cols = { off: [] }
  habitats.forEach(({ _id }) => {
    cols[_id] = []
  })
  animals.forEach((a) => {
    if (!a.habitat) cols.off.push({ id: a._id, content: a })
    else if (a.habitat._id in cols) cols[a.habitat._id].push({ id: a._id, content: a })
    else console.warn(`Animal in nonexistent habitat ${a.habitat._id}`)
  })
  return cols
}

const AnimalsBoard = ({ animals, habitats, onDelete }) => {
  const [animalsState, setAnimals] = useState(constructState(animals, habitats))
  const [showAddHabitatDialog, setShowAddHabitatDialog] = useState(false)
  const [updateHabitat, setUpdateHabitat] = useState(null)

  const [updateAnimal] = useMutation(UPDATE_ANIMAL, {
    onError: (err) => {
      toast.error({
        message: 'There was an error trying to move this animal!'
      })
      console.error(JSON.stringify(err))
    }
  })

  useEffect(() => {
    setAnimals(constructState(animals, habitats))
  }, [animals])

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const [removed] = sourceClone.splice(droppableSource.index, 1)

    destClone.splice(droppableDestination.index, 0, removed)

    updateAnimal({
      variables: {
        _id: removed.id,
        habitat: droppableDestination.droppableId === 'off' ? null : droppableDestination.droppableId
      }
    })

    return {
      [droppableSource.droppableId]: sourceClone,
      [droppableDestination.droppableId]: destClone
    }
  }

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return // dropped off the list
    if (source.droppableId !== destination.droppableId) {
      // moved to another list
      const res = move(
        animalsState[source.droppableId],
        animalsState[destination.droppableId],
        source,
        destination
      )
      setAnimals((prev) => ({ ...prev, ...res }))
    }
  }

  const renderList = (provided, snapshot, list) => (
    <div
      {...provided.droppableProps}
      ref={provided.innerRef}
      className={`flex flex-col w-full h-full p-2 rounded-lg ${snapshot.isDraggingOver ? 'bg-primary-transparent' : 'bg-background'}`}
    >
      {(list || []).map((item, index) => (
        <Draggable
          key={item.id}
          draggableId={item.id}
          index={index}
        >
          {(draggableProvided, draggableSnapshot) => (
            <div
              ref={draggableProvided.innerRef}
              {...draggableProvided.dragHandleProps}
              {...draggableProvided.draggableProps}
              style={{ ...draggableProvided.draggableProps.style }}
              className={`mb-2 rounded-lg bg-white outline-none transition duration-150 ${draggableSnapshot.isDragging ? 'border border-primary' : 'shadow hover:shadow-md'}`}
            >
              <AnimalCard {...item.content} onDelete={() => onDelete(item.id)} />
            </div>
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </div>
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-row mx-4">
        {
          habitats.map((h, i) => (
            <div className={`flex flex-col items-center w-1/${habitats.length + 1} mx-2`} key={i}>
              <Typography variant="h6" className="mb-2">{h.name}</Typography>
              <Droppable droppableId={h._id}>
                {(provided, snapshot) => renderList(provided, snapshot, animalsState[h._id])}
              </Droppable>
              <Button minimal className="mt-2" onClick={() => setUpdateHabitat(h)}>Edit Habitat</Button>
            </div>
          ))
        }
        <div className={`flex flex-col items-center w-1/${habitats.length + 1} mx-2`}>
          <Typography variant="h6" className="mb-2">Off Exhibit</Typography>
          <Droppable droppableId="off">
            {(provided, snapshot) => renderList(provided, snapshot, animalsState.off)}
          </Droppable>
          <Button minimal className="mt-2" onClick={() => setShowAddHabitatDialog(true)}>Create Habitat</Button>
        </div>
      </div>
      <AddHabitatDialog isOpen={showAddHabitatDialog} close={() => setShowAddHabitatDialog(false)} />
      <UpdateHabitatDialog isOpen={updateHabitat !== null} close={() => setUpdateHabitat(null)} data={updateHabitat} />
    </DragDropContext>
  )
}
AnimalsBoard.propTypes = {
  animals: PropTypes.array.isRequired,
  habitats: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default AnimalsBoard
