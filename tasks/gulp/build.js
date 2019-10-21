const { task, src, dest } = require('gulp')
const emoji = require('node-emoji')
const { green } = require('chalk')
const log = require('fancy-log')

task('build:govuk-frontend', async () => {
  log(`${emoji.get('clipboard')}  ${green.bold('- Copying GOV.UK Frontend to package directory')}`)
  src(['node_modules/govuk-frontend/**'])
    .pipe(dest('package/govuk-frontend'))
})

task('build:digitalmarketplace', async () => {
  log(`${emoji.get('clipboard')}  ${green.bold('- Copying Digital Marketplace to package directory')}`)
  src(['src/digitalmarketplace/**',
    '!**/*.test.js'])
    .pipe(dest('package/digitalmarketplace'))
})
