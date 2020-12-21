const Pi = {
  Query: {
    async uptime(parent, _, { start_time }) {
      return start_time
    }
  }
}

module.exports = Pi
