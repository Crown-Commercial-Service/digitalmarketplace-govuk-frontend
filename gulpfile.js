// Clean compiled files/folders
const { task, series } = require('gulp')
require('./tasks/gulp/clean')
require('./tasks/gulp/build')

task('build', series('clean', 'build:govuk-frontend'))
