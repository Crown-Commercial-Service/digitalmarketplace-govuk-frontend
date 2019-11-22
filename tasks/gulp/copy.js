const { src, dest, parallel } = require('gulp')
const emoji = require('node-emoji')
const { green } = require('chalk')
const log = require('fancy-log')

// @params logMsg - string to log out to terminal
// @params - srcToCopy - array/string of folders/files to copy
// @params - destTo - string of destination to save the new folders/files to.
const copy = async (logMsg, srcToCopy, destTo) => {
  log(emoji.get('clipboard') + '  ' + green.bold(`- ${logMsg}`))
  await src(srcToCopy)
    .pipe(dest(destTo))
}

const CopyForDev = async (done) => {
  await copy('Copying GOV.UK Frontend to src directory',
    ['node_modules/govuk-frontend/**'],
    'src/govuk-frontend'
  )
  await done()
}

const copyGOVUKFrontendForPublishing = async (done) => {
  await copy('Copying GOV.UK Frontend to package directory',
    ['node_modules/govuk-frontend/**'],
    'package/govuk-frontend'
  )
  await done()
}
copyGOVUKFrontendForPublishing.displayName = 'Copy: GOV.UK Frontend for Publishing'

const copyDigitalMarketplaceForPublishing = async (done) => {
  await copy('Copying Digital Marketplace to package directory',
    ['src/digitalmarketplace/**',
      '!**/*.test.js',
      '!src/**/__snapshots__/**',
      '!src/**/*.yaml'],
    'package/digitalmarketplace'
  )
  await done()
}
copyDigitalMarketplaceForPublishing.displayName = 'Copy: Digital Marketplace for Publishing'

module.exports = {
  development: CopyForDev,
  forPublishing: parallel(copyDigitalMarketplaceForPublishing,
    copyGOVUKFrontendForPublishing)
}
