const { ApolloError } = require('apollo-server-express')

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
  }
}

module.exports = Animal
