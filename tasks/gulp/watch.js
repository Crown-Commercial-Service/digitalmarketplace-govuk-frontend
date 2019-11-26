'use strict'
const { watch, parallel } = require('gulp')
const configPaths = require('../../config/paths.json')
const compile = require('./compile-assets')

// Watch task ----------------------------
// When a file is changed, re-run the build task.
// ---------------------------------------
const watching = () => {
  watch([configPaths.src + '**/**/*.scss', configPaths.app + 'assets/scss/**/*.scss'], parallel(compile.scss))
  watch([configPaths.src + '**/**/*.js'], parallel(compile.js))
}

module.exports = watching
