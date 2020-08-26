const mongoose = require('mongoose')

const { Schema } = mongoose

const Log = new Schema({
  timestamp: {
    type: Date,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('log', Log)
