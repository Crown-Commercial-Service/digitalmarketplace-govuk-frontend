const nodemon = require('nodemon')
const browserSync = require('browser-sync')

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

const liveReload = (done) => {
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    files: ['app/public/**/*.*', 'app/**/*.njk', 'src/**/*'],
    port: 3001
  })
  done()
}

module.exports = { server: serverMonitor, browser: liveReload }
