const { series, parallel } = require('gulp')
const clean = require('./tasks/gulp/clean')
const copy = require('./tasks/gulp/copy')
const compile = require('./tasks/gulp/compile-assets')

exports.postInstall = series(clean.all, copy.development)

exports.build = series(clean.pkg, copy.forPublishing)

exports.compiling = series(parallel(compile.js, compile.scss))

exports.default = exports.postInstall
