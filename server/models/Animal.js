const mongoose = require('mongoose')
const HabitatModel = require('./Habitat')

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
  habitat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: HabitatModel,
    default: null
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('animal', Animal)
