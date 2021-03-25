const { ApolloError } = require('apollo-server-express')
const { ensureCapitalized, writeLog } = require('../../utils/functions/api')

const populateAnimal = async (models, animal) => {
  return new Promise((resolve, reject) => {
    models.Habitat.findOne({ _id: animal.habitat }, (err1, habitat) => {
      if (err1) reject(err1)
      else {
        models.AnimalTaxon.findOne({ _id: animal.type }, (err2, type) => {
          if (err2) reject(err2)
          else {
            resolve({
              ...animal,
              habitat,
              type
            })
          }
        })
      }
    })
  })
}
const populateAnimals = async (models, animals) => {
  return Promise.all(
    animals.map((a) => populateAnimal(models, a))
  )
}

const Animal = {
  Query: {
    async animals(parent, { filter }, { models }) {
      const where = {}
      /* allow search functionality */
      if (filter) {
        where.$and = filter.split(' ').map((f) => ({
          $or: [
            { name: { $regex: new RegExp(`.*${f}.*`, 'i') } }
            /* can add additional filtering in the future */
          ]
        }))
      }
      return new Promise((resolve, reject) => {
        models.Animal.find(where, (err, animals) => {
          if (err) reject(err)
          else populateAnimals(models, animals).then((data) => { resolve(data) })
        })
      })
        .catch((err) => { throw new ApolloError(err) })
    }
  },
  Mutation: {
    async createAnimal(parent, { name, type, intake }, { models }) {
      return new Promise((resolve, reject) => {
        models.AnimalTaxon.find({ _id: type }, (err1, taxon) => {
          if (err1) reject(err1)
          else if (!taxon || !taxon.length) reject(Error('Animal taxon does not exist!'))
          else {
            models.Animal.insert({
              name: ensureCapitalized(name),
              type,
              intake: intake || taxon[0].defaultIntake
            }, (err2, animal) => {
              if (err2) reject(err2)
              else {
                writeLog(models, `Created animal "${name}"`, 'animal')
                  .then(() => {
                    populateAnimal(models, animal)
                      .then((data) => { resolve(data) })
                  })
              }
            })
          }
        })
      })
        .catch((err) => { throw new ApolloError(err) })
    },
    async updateAnimal(parent, { _id, ...args }, { models }) {
      return new Promise((resolve, reject) => {
        if (args.name) args.name = ensureCapitalized(args.name)
        models.Animal.update({ _id }, { $set: args }, { multi: false, new: true }, (err1) => {
          if (err1) reject(err1)
          /** refetch the animal */
          models.Animal.findOne({ _id }, (err2, animal) => {
            if (err2) reject(err2)
            /** write to the log for changes other than switching between habitats */
            else if (!(Object.keys(args).length === 1 && args.habitat)) {
              writeLog(models, `Updated animal "${animal.name}"`, 'animal')
                .then(() => {
                  populateAnimal(models, animal)
                    .then((data) => { resolve(data) })
                })
            } else {
              populateAnimal(models, animal)
                .then((data) => { resolve(data) })
            }
          })
        })
      })
        .catch((err) => { throw new ApolloError(err) })
    },
    async deleteAnimal(parent, { _id }, { models }) {
      return new Promise((resolve, reject) => {
        /** verify that animal exists */
        models.Animal.findOne({ _id }, (err1, animal) => {
          if (!animal) reject(Error('Animal does not exist!'))
          else if (err1) reject(err1)
          else {
            models.Animal.remove({ _id }, {}, (err2) => {
              if (err2) reject(err2)
              writeLog(models, `Deleted animal "${animal.name}"`, 'animal')
              resolve(animal)
            })
          }
        })
      })
        .catch((err) => { throw new ApolloError(err) })
    }
  }
}

module.exports = Animal
