import gql from 'graphql-tag'

export const CREATE_ANIMAL = gql`
  mutation createAnimal($name: String!, $type: String!, $intake: Float!) {
    createAnimal(name: $name, type: $type, intake: $intake) {
      _id
      name
      type
      intake
      inExhibit
    }
  }
`

export const UPDATE_ANIMAL = gql`
  mutation updateAnimal($_id: String!, $name: String, $type: String, $intake: Float, $inExhibit: Boolean) {
    updateAnimal(_id: $_id, name: $name, type: $type, intake: $intake, inExhibit: $inExhibit) {
      _id
      name
      type
      intake
      inExhibit
    }
  }
`

export const DELETE_ANIMAL = gql`
  mutation deleteAnimal($_id: String!) {
    deleteAnimal(_id: $_id) {
      _id
    }
  }
`

export const CREATE_FEEDER = gql`
  mutation createFeeder($name: String!, $description: String) {
    createFeeder(name: $name, description: $description) {
      _id
      name
      description
      status
    }
  }
`

export const UPDATE_FEEDER = gql`
  mutation updateFeeder($_id: String!, $name: String, $description: String, $status: String) {
    updateFeeder(_id: $_id, name: $name, description: $description, status: $status) {
      _id
      name
      description
      status
    }
  }
`

export const DELETE_FEEDER = gql`
  mutation deleteFeeder($_id: String!) {
    deleteFeeder(_id: $_id) {
      _id
    }
  }
`
