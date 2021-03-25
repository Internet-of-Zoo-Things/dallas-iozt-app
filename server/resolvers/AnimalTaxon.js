const { ApolloError } = require('apollo-server-express')
const { ensureCapitalized, writeLog } = require('../../utils/functions/api')

const AnimalTaxon = {
  Query: {
    async animalTaxons(parent, filter, { models }) {
      return new Promise((resolve, reject) => {
        models.AnimalTaxon.find(filter, (err, data) => {
          if (err) reject(err)
          else resolve(data)
        })
      })
        .catch((err) => { throw new ApolloError(err) })
    }
  },
  Mutation: {
    async createAnimalTaxon(parent, { name, defaultIntake }, { models }) {
      return new Promise((resolve, reject) => {
        models.AnimalTaxon.insert({
          name: ensureCapitalized(name),
          defaultIntake
        }, (err, taxon) => {
          if (err) reject(err)
          else {
            writeLog(models, `Created animal taxon "${name}"`, 'animal taxon')
              .then(() => { resolve(taxon) })
          }
        })
      })
        .catch((err) => { throw new ApolloError(err) })
    },
    async updateAnimalTaxon(parent, { _id, ...args }, { models }) {
      return new Promise((resolve, reject) => {
        if (args.name) args.name = ensureCapitalized(args.name)
        models.AnimalTaxon.update({ _id }, { $set: args }, { multi: false }, (err1) => {
          if (err1) reject(err1)
          else {
            models.AnimalTaxon.findOne({ _id }, (err2, data) => {
              if (err2) reject(err2)
              else {
                writeLog(models, `Updated animal taxon "${data.name}"`, 'animal taxon')
                  .then(() => { resolve(data) })
              }
            })
          }
        })
      })
        .catch((err) => { throw new ApolloError(err) })
    },
    async deleteAnimalTaxon(parent, { _id }, { models }) {
      return new Promise((resolve, reject) => {
        /** delete all animals associated with taxon first */
        models.Animal.remove({ type: _id }, { multi: true }, (err1) => {
          if (err1) reject(err1)
          else {
            /** verify that taxon exists */
            models.AnimalTaxon.findOne({ _id }, (err2, data) => {
              if (err2) reject(err2)
              else {
                /** actually delete */
                models.AnimalTaxon.remove({ _id }, { multi: false }, (err3) => {
                  if (err3) reject(err3)
                  else {
                    writeLog(models, `Deleted animal taxon "${data.name}"`, 'animal taxon')
                      .then(() => { resolve(data) })
                  }
                })
              }
            })
          }
        })
      })
        .catch((err) => { throw new ApolloError(err) })
    }
  }
}

module.exports = AnimalTaxon
