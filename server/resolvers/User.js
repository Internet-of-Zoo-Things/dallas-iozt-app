
const User = {
  Query: {
    async activeUser(parent, args, { user }) {
      return user
    }
  }
}

module.exports = User
