const { writeLog } = require('.')

const fallback_defaults = [{
  name: 'low',
  type: 'intake',
  value: 3
}, {
  name: 'medium',
  type: 'intake',
  value: 5
}, {
  name: 'high',
  type: 'intake',
  value: 7
}, {
  name: 'feeder_capacity',
  type: 'calibration',
  value: 60,
  description: 'The approximate number of seconds required to discharge all feed from a feeder'
}, {
  name: 'feeder_disable_capacity',
  type: 'calibration',
  value: 0.05,
  description: 'The percentage at which a feeder is considered sufficiently low enough on feed to be disabled by the system'
}]

module.exports = async (models) => {
  console.warn('* Checking for required defaults...')

  models.Default.find(undefined, (err1, defaults) => {
    if (err1) {
      console.error(err1)
      throw Error('Could not access database to fetch application defaults')
    }
    /** turn defaults into a dict for checking */
    const dict = {}
    defaults.forEach((d) => {
      dict[d.name] = 1
    })
    /** check all required defaults to ensure that they're there, falling back on them if any are missing */
    const missing = []
    fallback_defaults.forEach((f) => {
      if (!(f.name in dict)) missing.push(f)
    })
    /** push to db if any are missing */
    if (missing.length) {
      console.warn(`* ${missing.length} required defaults missing from the database, adding now...`)
      models.Default.insert(missing, (err2) => {
        if (err2) {
          console.error(err2)
          throw Error('Unable to insert missing required default values into database')
        }
        writeLog(models, `Some defaults were missing, automatically added ${missing.length} values to the db`)
      })
    }
  })

  /** ensure that at least the "elephant" taxon exists */
  models.AnimalTaxon.count({}, (err1, count) => {
    if (err1) {
      console.error(err1)
      throw Error('Could not access database to fetch application defaults')
    }
    if (!count) {
      models.AnimalTaxon.insert({ name: 'Elephant', defaultIntake: 5 }, (err2) => {
        if (err2) {
          console.error(err2)
          throw Error('Unable to insert missing required default values into database')
        }
        writeLog(models, 'No animal taxons existed, automatically added "Elephant"')
      })
    }
  })
}
