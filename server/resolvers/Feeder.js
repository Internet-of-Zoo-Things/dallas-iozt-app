const { ApolloError } = require('apollo-server-express')
const { ensureCapitalized, writeLog } = require('../../utils/functions/api')

const populateFeeder = async (models, feeder) => {
  return new Promise((resolve, reject) => {
    models.Habitat.findOne({ _id: feeder.habitat }, (err1, habitat) => {
      if (err1) reject(err1)
      else resolve({ ...feeder, habitat })
    })
  })
}
const populateFeeders = async (models, feeders) => {
  return Promise.all(
    feeders.map((f) => populateFeeder(models, f))
  )
}

const Feeder = {
  Query: {
    async feeders(parent, args, { models }) {
      return new Promise((resolve, reject) => {
        models.Feeder.find({}, (err, feeders) => {
          if (err) reject(err)
          else populateFeeders(models, feeders).then((data) => { resolve(data) })
        })
      })
        .catch((err) => { throw new ApolloError(err) })
    }
  },
  Mutation: {
    async createFeeder(parent, { name, description, habitat }, { models }) {
      return new Promise((resolve, reject) => {
        models.Feeder.insert({
          name: ensureCapitalized(name),
          description: ensureCapitalized(description),
          habitat,
          remaining_percentage: 1,
          status: 'online'
        }, (err, feeder) => {
          if (err) reject(err)
          else {
            writeLog(models, `Created feeder "${name}"`, 'feeder')
              .then(() => {
                populateFeeder(models, feeder)
                  .then((data) => { resolve(data) })
              })
          }
        })
      })
        .catch((err) => { throw new ApolloError(err) })
    },
    async updateFeeder(parent, { _id, ...args }, { models }) {
      return new Promise((resolve, reject) => {
        models.Default.findOne({ name: 'feeder_disable_capacity' }, (err1, trigger) => {
          if (err1) {
            console.error('Could not pull defaults in order to update feeder status based on remaining_percentage manual update')
            console.error(err1)
          }
          if (args.name) args.name = ensureCapitalized(args.name)
          /** disable if below the set disable capacity */
          if (args.remaining_percentage && trigger) {
            args.status = args.remaining_percentage >= trigger.value ? 'online' : 'disabled'
          }
          models.Feeder.update({ _id }, { $set: args }, { multi: false }, (err2) => {
            if (err2) reject(err2)
            else {
              models.Feeder.findOne({ _id }, (err3, feeder) => {
                if (err3) reject(err3)
                else {
                  writeLog(models, `Updated feeder "${feeder.name}"`, 'feeder')
                    .then(() => {
                      populateFeeder(models, feeder)
                        .then((data) => { resolve(data) })
                    })
                }
              })
            }
          })
        })
      })
        .catch((err) => { throw new ApolloError(err) })
    },
    async deleteFeeder(parent, { _id }, { models }) {
      // TODO: when a feeder is deleted, divert all feed times to other feeders
      return new Promise((resolve, reject) => {
        models.Feeder.findOne({ _id }, (err1, feeder) => {
          if (err1) reject(err1)
          else {
            models.Feeder.remove({ _id }, { multi: false }, (err2) => {
              if (err2) reject(err2)
              else {
                writeLog(models, `Deleted feeder "${feeder.name}"`, 'feeder')
                  .then(() => { resolve(feeder) })
              }
            })
          }
        })
      })
        .catch((err) => { throw new ApolloError(err) })
    }
  }
}

module.exports = Feeder
