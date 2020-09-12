const { ApolloError } = require('apollo-server-express')
const { isEmail } = require('../../utils/functions/api')

const User = {
  Query: {
    async activeUser(parent, args, { user }) {
      return user
    },
    async users(parent, { filter }, { models }) {
      return models.User.find(filter)
        .then((users) => users.map((u) => ({ ...u._doc, notifications: u.notifications || [] })))
        .catch((err) => { throw new ApolloError(err) })
    },
    async notifications(parent, { viewed }, { models, user }) {
      return models.User.findOne({ username: user.username })
        .then((data) => {
          // ideally this would be accomplished with a mongo projection rather than filtering the result here
          if (viewed === undefined) return data.notifications || []
          return data.notifications.filter((n) => n.viewed === viewed)
        })
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
    },
    async updateNotifications(parent, { _ids, viewed }, { models, user }) {
      const u = await models.User.findOne({ username: user.username })
      if (!u) throw new ApolloError(`User ${user.username} doesn't exist!`)
      u.notifications.forEach((n) => {
        if (_ids.includes(`${n._id}`)) n.viewed = viewed
      })
      u.updated_at = new Date()
      u.markModified('notifications')
      await u.save().catch((err) => { throw new ApolloError(err) })
      return u.notifications
    },
    async deleteNotifications(parent, { _ids }, { models, user }) {
      const u = await models.User.findOne({ username: user.username })
      if (!u) throw new ApolloError(`User ${user.username} doesn't exist!`)
      u.notifications = u.notifications.filter((n) => !_ids.includes(`${n._id}`))
      u.updated_at = new Date()
      u.markModified('notifications')
      await u.save().catch((err) => { throw new ApolloError(err) })
      return u.notifications
    }
  }
}

module.exports = User
