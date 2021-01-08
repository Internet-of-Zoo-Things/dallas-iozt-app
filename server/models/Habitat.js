const mongoose = require('mongoose')

const { Schema } = mongoose

const Habitat = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('habitat', Habitat)
