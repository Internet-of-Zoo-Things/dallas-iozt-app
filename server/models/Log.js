const mongoose = require('mongoose')

const { Schema } = mongoose

const Log = new Schema({
  timestamp: {
    type: Date,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('log', Log)
