const mongoose = require('mongoose')

const { Schema } = mongoose

const Feeder = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    required: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('feeder', Feeder)
