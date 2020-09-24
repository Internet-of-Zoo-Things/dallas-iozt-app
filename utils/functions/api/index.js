const mongoose = require('mongoose')
const { Log } = require('../../../server/models')

const isEmail = (str) => {
  // eslint-disable-next-line no-control-regex
  const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

  return regex.test(str)
}

/* writes a log entry to the database */
const writeLog = async (username, message, tag = 'general') => {
  return Log.create({
    timestamp: new Date(),
    username,
    message,
    tag
  })
    .catch((err) => { throw Error(err) })
}

const ensureCapitalized = (str) => str.charAt(0).toUpperCase() + str.slice(1)

/* creates a notification for given users or all users */
const createNotifications = async (models, message, usernames) => {
  if (usernames && !Array.isArray(usernames)) throw Error(`usernames argument must be an array of strings, recevied ${usernames}`)
  const notification = {
    message,
    timestamp: new Date(),
    viewed: false,
    _id: mongoose.Types.ObjectId()
  }
  return models.User.updateMany(
    usernames ? { username: { $in: usernames } } : {},
    { $push: { notifications: notification } },
    { new: true }
  ).catch((err) => { throw Error(err) })
}

module.exports = {
  isEmail,
  writeLog,
  ensureCapitalized,
  createNotifications
}
