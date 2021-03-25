const { ApolloError } = require('apollo-server-express')
const { ensureCapitalized, writeLog } = require('../../utils/functions/api')

const Habitat = {
  Query: {
    async habitats(parent, _, { models }) {
      return new Promise((resolve, reject) => {
        models.Habitat.find({}, (err, habitats) => {
          if (err) reject(err)
          else resolve(habitats)
        })
      })
        .catch((err) => { throw new ApolloError(err) })
    }
  },
  Mutation: {
    async createHabitat(parent, { name, description }, { models }) {
      return new Promise((resolve, reject) => {
        models.Habitat.insert({
          name: ensureCapitalized(name),
          description: ensureCapitalized(description)
        }, (err, habitat) => {
          if (err) reject(err)
          else {
            writeLog(models, `Created new habitat "${name}"`, 'habitat')
              .then(() => { resolve(habitat) })
          }
        })
      })
        .catch((err) => { throw new ApolloError(err) })
    },
    async updateHabitat(parent, { _id, ...args }, { models }) {
      return new Promise((resolve, reject) => {
        models.Habitat.findOne({ _id }, (err1, habitat) => {
          if (err1) reject(err1)
          if (!habitat) reject(Error('Habitat does not exist!'))
          else {
            models.Habitat.update({ _id }, { $set: args }, { multi: false }, (err2) => {
              if (err2) reject(err2)
              else {
                writeLog(models, `Updated habitat "${habitat.name}"`, 'habitat')
                  .then(() => { resolve({ ...habitat, ...args }) })
              }
            })
          }
        })
      })
    },
    async deleteHabitat(parent, { _id }, { models }) {
      return new Promise((resolve, reject) => {
        models.Habitat.findOne({ _id }, (err1, habitat) => {
          if (err1) reject(err1)
          if (!habitat) reject(Error('Habitat does not exist!'))
          else {
            models.Habitat.remove({ _id }, { multi: false }, (err2) => {
              if (err2) reject(err2)
              else {
                writeLog(models, `Deleted habitat "${habitat.name}"`, 'habitat')
                  .then(() => { resolve(habitat) })
              }
            })
          }
        })
      })
    }
  }
}

module.exports = Habitat
