import gql from 'graphql-tag'

export const CREATE_ANIMAL = gql`
  mutation createAnimal($name: String!, $type: String!, $intake: Float!) {
    createAnimal(name: $name, type: $type, intake: $intake) {
      _id
    }
  }
`

export const UPDATE_ANIMAL = gql`
  mutation createAnimal($_id: String!, $name: String, $type: String, $intake: Float) {
    createAnimal(_id: $_id, name: $name, type: $type, intake: $intake) {
      _id
    }
  }
`

export const DELETE_ANIMAL = gql`
  mutation createAnimal($_id: String!) {
    createAnimal(_id: $_id) {
      _id
    }
  }
`
