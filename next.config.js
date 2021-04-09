require('dotenv').config()

module.exports = {
  trailingSlash: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/
      },
      use: ['@svgr/webpack']
    })

    return config
  },
  env: {
    PORT: process.env.PORT
  }
}
