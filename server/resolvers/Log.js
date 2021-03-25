const { ApolloError } = require('apollo-server-express')

const Log = {
  Query: {
    async logs(parent, { tag, limit, skip }, { models }) {
      return new Promise((resolve, reject) => {
        models.Log.find(tag ? { tag } : {}).sort({ timestamp: -1 }).limit(limit).skip(skip || 0)
          .exec((err, logs) => {
            if (err) reject(err)
            else resolve(logs)
          })
      })
        .catch((err) => { throw new ApolloError(err) })
    },
    async logCount(parent, { tag }, { models }) {
      return new Promise((resolve, reject) => {
        models.Log.count(tag ? { tag } : {}, (err, count) => {
          if (err) reject(err)
          else resolve(count)
        })
      })
        .catch((err) => { throw new ApolloError(err) })
    },
    async logTags(parent, args, { models }) {
      return new Promise((resolve, reject) => {
        models.Log.find({}, (err, logs) => {
          if (err) reject(err)
          else {
            /** use dict for o(1) lookup and insertion */
            const tagsDict = logs.reduce((dict, curr) => {
              if (!(curr.tag in dict)) dict[curr.tag] = true
              return dict
            }, {})
            resolve(Object.keys(tagsDict))
          }
        })
      })
        .catch((err) => { throw new ApolloError(err) })
    }
  }
}

module.exports = Log
