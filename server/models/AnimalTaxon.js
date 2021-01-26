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
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('animal_taxon', AnimalTaxon)
