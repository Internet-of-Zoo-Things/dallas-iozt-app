const mongoose = require('mongoose')

const { Schema } = mongoose

const AnimalTaxon = new Schema({
  name: {
    type: String,
    required: true
  },
  defaultIntake: {
    type: Number,
    required: true
  }
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

module.exports = mongoose.model('animal_taxon', AnimalTaxon)
