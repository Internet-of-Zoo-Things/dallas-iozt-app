const mongoose = require('mongoose')
const HabitatModel = require('./Habitat')

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
  },
  habitat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: HabitatModel,
    required: true
  },
  remaining_percentage: {
    type: Number,
    required: true,
    default: 1
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('feeder', Feeder)
