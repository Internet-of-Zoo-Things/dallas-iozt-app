const mongoose = require('mongoose')
const Feeder = require('./Feeder')

const { Schema } = mongoose

const FeedTime = new Schema({
  feeder: {
    type: Schema.Types.ObjectId,
    ref: Feeder,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('feedtime', FeedTime)
