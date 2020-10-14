import React, { useState, useEffect } from 'react'
import {
  DragDropContext, Droppable, Draggable
} from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
import { useMutation } from 'react-apollo'
import { Typography, toast } from '../../primitives'
import AnimalCard from './AnimalCard'
import { UPDATE_ANIMAL } from '../../../utils/graphql/mutations'

const constructState = (animals) => ({
  on: animals.filter((a) => a.onExhibit).map((a) => ({ id: a._id, content: a })),
  off: animals.filter((a) => !a.onExhibit).map((a) => ({ id: a._id, content: a }))
})

const AnimalsBoard = ({ animals, onDelete }) => {
  const [animalsState, setAnimals] = useState(constructState(animals))

  const [updateAnimal] = useMutation(UPDATE_ANIMAL, {
    onError: (err) => {
      toast.error({
        message: 'There was an error trying to move this animal!'
      })
      console.error(JSON.stringify(err))
    }
  })

  useEffect(() => {
    setAnimals(constructState(animals))
  }, [animals])

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const [removed] = sourceClone.splice(droppableSource.index, 1)

    destClone.splice(droppableDestination.index, 0, removed)

    updateAnimal({
      variables: {
        _id: removed.id,
        onExhibit: droppableDestination.droppableId === 'on'
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
      setAnimals(res)
    }
  }

  const renderList = (provided, snapshot, list) => (
    <div
      {...provided.droppableProps}
      ref={provided.innerRef}
      className={`flex flex-col w-full h-full p-2 rounded-lg ${snapshot.isDraggingOver ? 'bg-primary-transparent' : 'bg-background'}`}
    >
      {list.map((item, index) => (
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
        <div className="flex flex-col items-center w-1/2 mx-2">
          <Typography variant="h6" className="mb-2">On Exhibit</Typography>
          <Droppable droppableId="on">
            {(provided, snapshot) => renderList(provided, snapshot, animalsState.on)}
          </Droppable>
        </div>
        <div className="flex flex-col items-center w-1/2 mx-2">
          <Typography variant="h6" className="mb-2">Off Exhibit</Typography>
          <Droppable droppableId="off">
            {(provided, snapshot) => renderList(provided, snapshot, animalsState.off)}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  )
}
AnimalsBoard.propTypes = {
  animals: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default AnimalsBoard
