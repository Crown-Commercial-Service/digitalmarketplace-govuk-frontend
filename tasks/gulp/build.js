const { task, src, dest} = require('gulp')
const debug = require('gulp-debug')
const emoji = require('node-emoji')
const { green } = require('chalk')
const log = require('fancy-log')

task('build:govuk-frontend', async () => {
  log(`${emoji.get('clipboard')}  ${green.bold('- Copying GOV.UK Frontend to package directory')}`)
  src(['node_modules/govuk-frontend/**'])
    .pipe(debug({title: 'Copied'}))
    .pipe( dest('package/govuk-frontend'))
})
