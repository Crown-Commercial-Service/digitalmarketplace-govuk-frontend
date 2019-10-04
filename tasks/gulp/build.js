const { task, src, dest} = require('gulp')
const debug = require('gulp-debug')

task('build:govuk-frontend', async () => {

  src(['node_modules/govuk-frontend/**'])
    .pipe(debug({title: 'Copied'}))
    .pipe( dest('package/govuk-frontend'))
})
