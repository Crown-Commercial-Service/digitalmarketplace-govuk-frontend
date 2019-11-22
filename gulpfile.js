const { series } = require('gulp')
const clean = require('./tasks/gulp/clean')
const copy = require('./tasks/gulp/copy')

exports.postInstall = series(clean.all, copy.development)

exports.build = series(clean.pkg, copy.forPublishing)

exports.default = exports.postInstall
