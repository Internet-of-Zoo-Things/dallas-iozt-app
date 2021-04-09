const { ApolloError } = require('apollo-server-express')
const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')
const { writeLog } = require('../../utils/functions/api')

const Default = {
  Query: {
    async defaults(parent, filter, { models }) {
      return new Promise((resolve, reject) => {
        models.Default.find(filter, (err, defaults) => {
          if (err) reject(err)
          else resolve(defaults)
        })
      })
        .catch((err) => { throw new ApolloError(err) })
    }
  },
  Mutation: {
    async createDefault(parent, args, { models }) {
      return new Promise((resolve, reject) => {
        models.Default.insert(args, (err, _default) => {
          if (err) reject(err)
          else {
            writeLog(models, `Created default "${args.name}"`, 'default')
              .then(() => { resolve(_default) })
          }
        })
      })
        .catch((err) => { throw new ApolloError(err) })
    },
    async updateDefault(parent, { _id, ...args }, { models }) {
      return new Promise((resolve, reject) => {
        models.Default.update({ _id }, { $set: args }, { multi: false }, (err1) => {
          if (err1) reject(err1)
          else {
            models.Default.findOne({ _id }, (err2, _default) => {
              if (err2) reject(err2)
              else {
                writeLog(models, `Updated default "${args.name}"`, 'default')
                  .then(() => { resolve(_default) })
              }
            })
          }
        })
      })
        .catch((err) => { throw new ApolloError(err) })
    },
    async deleteDefault(parent, { _id }, { models }) {
      return new Promise((resolve, reject) => {
        models.Default.findOne({ _id }, (err1, _default) => {
          if (err1) reject(err1)
          else {
            models.Default.remove({ _id }, { multi: false }, (err2) => {
              if (err2) reject(err2)
              else {
                writeLog(models, `Deleted default "${_default.name}"`, 'default')
                  .then(() => { resolve(_default) })
              }
            })
          }
        })
      })
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
