const { task, series, parallel } = require('gulp')
require('./tasks/gulp/clean')
require('./tasks/gulp/build')

task('build',
  series('clean',
    parallel('build:govuk-frontend', 'build:digitalmarketplace')
  )
)
