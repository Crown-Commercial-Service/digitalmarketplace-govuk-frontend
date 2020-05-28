const { series, parallel } = require('gulp')
const clean = require('./tasks/gulp/clean')
const copy = require('./tasks/gulp/copy')
const compileAssets = require('./tasks/gulp/compile-assets')

const postInstall = series(clean.all, copy.development)

const compile = series(parallel(compileAssets.js, compileAssets.scss))

const build = series(
  clean.pkg,
  copy.forPublishing,
  compile
)

exports.build = build
exports.compile = compile
exports.postInstall = postInstall
exports.default = exports.postInstall
