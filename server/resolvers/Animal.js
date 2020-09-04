const { ApolloError } = require('apollo-server-express')
const { ensureCapitalized } = require('../../utils/functions/api')

const Animal = {
  Query: {
    async animals(parent, { filter }, { models }) {
      const where = {}
      /* allow search functionality */
      if (filter) {
        where.$and = filter.split(' ').map((f) => ({
          $or: [
            { name: { $regex: new RegExp(`.*${f}.*`, 'i') } },
            { type: { $regex: new RegExp(`.*${f}.*`, 'i') } }
          ]
        }))
      }
      return models.Animal.find(where)
        .catch((err) => { throw new ApolloError(err) })
    }
  },
  Mutation: {
    async createAnimal(parent, { name, type, intake }, { models }) {
      return models.Animal.create({
        name: ensureCapitalized(name),
        type: ensureCapitalized(type),
        intake,
        created_at: new Date(),
        updated_at: new Date()
      })
        .catch((err) => { throw new ApolloError(err) })
    },
    async updateAnimal(parent, { _id, ...args }, { models }) {
      if (args.name) args.name = ensureCapitalized(args.name)
      if (args.type) args.type = ensureCapitalized(args.type)
      return models.Animal.findByIdAndUpdate(_id, {
        ...args,
        updated_at: new Date()
      })
        .catch((err) => { throw new ApolloError(err) })
    },
    async deleteAnimal(parent, { _id }, { models }) {
      return models.Animal.findByIdAndDelete(_id)
        .catch((err) => { throw new ApolloError(err) })
    }
  }
}

module.exports = Animal
