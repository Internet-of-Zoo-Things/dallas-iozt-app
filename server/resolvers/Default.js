const { ApolloError } = require('apollo-server-express')
const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

const Default = {
  Query: {
    async defaults(parent, filter, { models }) {
      return models.Default.find(filter)
        .catch((err) => { throw new ApolloError(err) })
    }
  },
  Mutation: {
    async createDefault(parent, args, { models }) {
      return models.Default.create(args)
        .catch((err) => { throw new ApolloError(err) })
    },
    async updateDefault(parent, { _id, ...args }, { models }) {
      return models.Default.findByIdAndUpdate(_id, args, { new: true })
        .catch((err) => { throw new ApolloError(err) })
    },
    async deleteDefault(parent, { _id }, { models }) {
      return models.Default.findByIdAndDelete(_id)
        .catch((err) => { throw new ApolloError(err) })
    }
  },
  Any: new GraphQLScalarType({
    name: 'Any',
    description: 'Custom type to represent any data',
    parseValue: (value) => {
      return typeof value === 'object'
        ? JSON.stringify(value)
        : value
    },
    serialize: (value) => {
      return typeof value === 'string'
        ? JSON.parse(value)
        : value
    },
    parseLiteral: (ast) => {
      switch (ast.kind) {
      case Kind.STRING: return JSON.parse(ast.value)
      case Kind.OBJECT: throw new Error('Not sure what to do with OBJECT for ObjectScalarType')
      default: return null
      }
    }
  })
}

module.exports = Default
