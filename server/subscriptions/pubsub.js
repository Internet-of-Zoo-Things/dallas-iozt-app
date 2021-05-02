const { PubSub } = require('apollo-server-express')

/* initialize graphql subscriptions */
const pubsub = new PubSub()

module.exports = pubsub
