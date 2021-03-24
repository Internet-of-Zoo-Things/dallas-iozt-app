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
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

module.exports = mongoose.model('habitat', Habitat)
