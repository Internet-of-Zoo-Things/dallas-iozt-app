const mongoose = require('mongoose')

const { Schema } = mongoose

const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
})

module.exports = mongoose.model('user', User)
