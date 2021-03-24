const mongoose = require('mongoose')
const HabitatModel = require('./Habitat')
const AnimalTaxonModel = require('./AnimalTaxon')

const { Schema } = mongoose

const Animal = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: AnimalTaxonModel,
    required: true
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
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

module.exports = mongoose.model('animal', Animal)
