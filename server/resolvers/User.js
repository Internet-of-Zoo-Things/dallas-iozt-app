const { ApolloError } = require('apollo-server-express')
const { isEmail } = require('../../utils/functions/api')

const User = {
  Query: {
    async activeUser(parent, args, { user }) {
      return user
    },
    async users(parent, { filter }, { models }) {
      return models.User.find(filter)
        .catch((err) => { throw new ApolloError(err) })
    }
  },
  Mutation: {
    async createUser(parent, { userInput }, { models }) {
      if (userInput.email && !isEmail(userInput.email)) throw new ApolloError(`${userInput.email} is not a valid email`)
      return models.User.create({
        ...userInput,
        created_at: new Date(),
        updated_at: new Date()
      })
        .catch((err) => { throw new ApolloError(err) })
    },
    async updateUser(parent, { _id, userInput }, { models }) {
      if (userInput.email && !isEmail(userInput.email)) throw new ApolloError(`${userInput.email} is not a valid email`)
      return models.User.findByIdAndUpdate(_id, {
        ...userInput,
        updated_at: new Date()
      }, { new: true })
        .catch((err) => { throw new ApolloError(err) })
    },
    async deleteUser(parent, { _id }, { models }) {
      return models.User.findByIdAndDelete(_id)
        .catch((err) => { throw new ApolloError(err) })
    }
  }
}

module.exports = User
