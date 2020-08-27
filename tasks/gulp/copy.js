const { src, dest, parallel } = require('gulp')
const emoji = require('node-emoji')
const fs = require('fs')
const { green } = require('chalk')
const log = require('fancy-log')

// Get the path to govuk-frontend source code
//
// Supports both govuk-frontend v2 and govuk-frontend v3, even though the
// source code is located in difference places for the two.
const getGOVUKFrontendSrc = () => {
  const isV3 = fs.existsSync('node_modules/govuk-frontend/govuk/')
  return isV3 ? 'node_modules/govuk-frontend/govuk/**' : 'node_modules/govuk-frontend/**'
}

// @params logMsg - string to log out to terminal
// @params - srcToCopy - array/string of folders/files to copy
// @params - destTo - string of destination to save the new folders/files to.
const copy = async (logMsg, srcToCopy, destTo) => {
  log(emoji.get('clipboard') + '  ' + green.bold(`- ${logMsg}`))
  await src(srcToCopy)
    .pipe(dest(destTo))
}

const CopyForDev = async (done) => {
  await copy('Copying GOV.UK Frontend to src directory for development',
    [getGOVUKFrontendSrc()],
    'src/govuk'
  )
  await done()
}

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
  forPublishing: copyDigitalMarketplaceForPublishing
}
