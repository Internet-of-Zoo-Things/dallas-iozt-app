const mongoose = require('mongoose')

const { Schema } = mongoose

const FeedTime = new Schema({
  feeder: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
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

module.exports = mongoose.model('feedtime', FeedTime)
