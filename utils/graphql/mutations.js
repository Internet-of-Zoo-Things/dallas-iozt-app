import gql from 'graphql-tag'

export const CREATE_ANIMAL = gql`
  mutation createAnimal($name: String!, $type: String!, $intake: Float) {
    createAnimal(name: $name, type: $type, intake: $intake) {
      _id
      name
      type {
        _id
        name
      }
      intake
      habitat {
        _id
      }
    }
  }
`

export const UPDATE_ANIMAL = gql`
  mutation updateAnimal($_id: String!, $name: String, $type: String, $intake: Float, $habitat: String) {
    updateAnimal(_id: $_id, name: $name, type: $type, intake: $intake, habitat: $habitat) {
      _id
      name
      type {
        _id
        name
      }
      intake
      habitat {
        _id
      }
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
  mutation createFeeder($name: String!, $description: String, $habitat: String!) {
    createFeeder(name: $name, description: $description, habitat: $habitat) {
      _id
      name
      description
      status
      habitat {
        name
      }
      remaining_percentage
    }
  }
`

export const UPDATE_FEEDER = gql`
  mutation updateFeeder($_id: String!, $name: String, $description: String, $status: String, $habitat: String, $remaining_percentage: Float) {
    updateFeeder(_id: $_id, name: $name, description: $description, status: $status, habitat: $habitat, remaining_percentage: $remaining_percentage) {
      _id
      name
      description
      status
      habitat {
        name
      }
      remaining_percentage
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

export const CREATE_FEED_TIME = gql`
  mutation createFeedTime($feeder: String!, $timestamp: DateTime!, $quantity: Float!) {
    createFeedTime(feeder: $feeder, timestamp: $timestamp, quantity: $quantity) {
      _id
      feeder {
        _id
        name
      }
      timestamp
      quantity
    }
  }
`

export const UPDATE_FEED_TIME = gql`
  mutation updateFeedTime($_id: String!, $feeder: String, $timestamp: DateTime, $quantity: Float) {
    updateFeedTime(_id: $_id, feeder: $feeder, timestamp: $timestamp, quantity: $quantity) {
      _id
      feeder {
        _id
        name
      }
      timestamp
      quantity
    }
  }
`

export const DELETE_FEED_TIME = gql`
  mutation deleteFeedTime($_id: String!) {
    deleteFeedTime(_id: $_id) {
      _id
    }
  }
`

export const DELETE_ALL_FEED_TIMES = gql`
  mutation deleteAllUpcomingFeedTimes {
    deleteAllUpcomingFeedTimes
  }
`

export const CREATE_HABITAT = gql`
  mutation createHabitat($name: String!, $description: String) {
    createHabitat(name: $name, description: $description) {
      _id
      name
      description
    }
  }
`

export const UPDATE_HABITAT = gql`
  mutation updateHabitat($_id: String!, $name: String, $description: String) {
    updateHabitat(_id: $_id, name: $name, description: $description) {
      _id
      name
      description
    }
  }
`

export const DELETE_HABITAT = gql`
  mutation deleteHabitat($_id: String!) {
    deleteHabitat(_id: $_id) {
      _id
    }
  }
`

export const UPDATE_DEFAULT = gql`
  mutation updateDefault($_id: String!, $value: Any!) {
    updateDefault(_id: $_id, value: $value) {
      _id
    }
  }
`

export const CREATE_ANIMAL_TAXON = gql`
  mutation createAnimalTaxon($name: String!, $defaultIntake: Float!) {
    createAnimalTaxon(name: $name, defaultIntake: $defaultIntake) {
      _id
      name
      defaultIntake
    }
  }
`

export const UPDATE_ANIMAL_TAXON = gql`
  mutation updateAnimalTaxon($_id: String!, $name: String, $defaultIntake: Float) {
    updateAnimalTaxon(_id: $_id, name: $name, defaultIntake: $defaultIntake) {
      _id
      name
      defaultIntake
    }
  }
`

export const DELETE_ANIMAL_TAXON = gql`
  mutation deleteAnimalTaxon($_id: String!) {
    deleteAnimalTaxon(_id: $_id) {
      _id
      name
      defaultIntake
    }
  }
`
