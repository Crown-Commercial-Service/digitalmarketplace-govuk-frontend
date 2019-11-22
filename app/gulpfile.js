const { parallel, series } = require('gulp')
const nodemon = require('../tasks/gulp/nodemon')
const watching = require('../tasks/gulp/watch')
const compile = require('../tasks/gulp/compile-assets')

// Change working directory back to the project root
process.chdir('../')

// Dev task -----------------------------
// Runs a sequence of task on start
// --------------------------------------
exports.dev = series(compile.scss, parallel(watching, nodemon))

// Serve task ---------------------------
// Restarts node app when there is changed
// affecting js, css or njk files
// --------------------------------------
exports.serve = parallel(watching, nodemon)
