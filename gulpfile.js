const { series, parallel } = require('gulp')
const clean = require('./tasks/gulp/clean')
const copy = require('./tasks/gulp/copy')
const compile = require('./tasks/gulp/compile-assets')

const postInstall = series(clean.all, copy.development)

const compiling = series(parallel(compile.js, compile.scss))

const build = series(
  clean.pkg,
  copy.forPublishing,
  compiling
)

exports.build = build
exports.compiling = compiling
exports.postInstall = postInstall
exports.default = exports.postInstall
