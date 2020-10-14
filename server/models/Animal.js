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
  onExhibit: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('animal', Animal)
