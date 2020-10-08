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
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('feedtime', FeedTime)
