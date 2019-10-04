// Clean compiled files/folders
const { task, series } = require('gulp')
require('./tasks/gulp/clean')
require('./tasks/gulp/build')

task('default', series('clean', 'build:govuk-frontend'))
