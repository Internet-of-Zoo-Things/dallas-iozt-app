require('dotenv').config()

module.exports = {
  trailingSlash: false,
  env: {
    PORT: process.env.PORT,
    INTERNET_ENABLED: process.env.INTERNET_ENABLED
  }
}
