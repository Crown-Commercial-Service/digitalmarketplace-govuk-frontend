const nodemon = require('nodemon')

// Nodemon task --------------------------
// Restarts node app for changes affecting
// js and json files
// ---------------------------------------
const serverMonitor = async (done) => {
  let started = false
  await nodemon({
    script: 'app/start.js'
  }).on('start', () => {
    if (!started) {
      done()
      started = true
    }
  })
}

module.exports = serverMonitor
