const mongoose = require('mongoose')

const { Schema } = mongoose

const Animal = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  intake: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    required: true
  },
  updated_at: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('animal', Animal)
