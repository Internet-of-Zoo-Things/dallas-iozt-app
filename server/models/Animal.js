const mongoose = require('mongoose')

const { Schema } = mongoose

const Animal = new Schema({
  name: {
    type: String,
    required: true
  },
  dsecription: {
    type: String
  },
  intake: {
    type: String,
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
