const axios = require('axios')
const fs = require('fs')

const isEmail = (str) => {
  // eslint-disable-next-line no-control-regex
  const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

  return regex.test(str)
}

/* writes a log entry to the database */
const writeLog = async (models, message, tag = 'general') => {
  return new Promise((resolve, reject) => {
    if (!models || !(typeof models === 'object')) reject(Error('models dictionary not provided'))
    models.Log.insert({
      timestamp: new Date(),
      message,
      tag
    }, (err, log) => {
      if (err) throw reject(err)
      resolve(log)
    })
  })
}

const ensureCapitalized = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : '')

const checkLatestVersion = async () => {
  return axios.get('https://raw.githubusercontent.com/Internet-of-Zoo-Things/dallas-iozt-app/master/version', {
    timeout: 1000,
    proxy: false
  })
    .then(({ data }) => {
      return data
    })
    .catch((err) => { throw err })
}

const checkCurrentVersion = () => {
  try {
    return fs.readFileSync('version', 'utf8')
  } catch (err) {
    console.error(err)
    throw err
  }
}

const getVersionData = (version) => {
  try {
    const data = JSON.parse(fs.readFileSync('changelog.json'))
    return version ? data[version] : data
  } catch (err) {
    console.error(err)
    throw err
  }
}

/** https://github.com/louischatriot/nedb#persistence */
const compactDatabase = (models) => {
  Object.keys(models).forEach((key) => {
    models[key].persistence.compactDatafile()
  })
  return true
}

module.exports = {
  isEmail,
  writeLog,
  ensureCapitalized,
  checkLatestVersion,
  checkCurrentVersion,
  getVersionData,
  compactDatabase
}
