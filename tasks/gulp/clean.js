const { parallel } = require('gulp')
const del = require('del')
const emoji = require('node-emoji')
const { green } = require('chalk')
const log = require('fancy-log')

// @params - srcToClean - array/string of folders/files to delete
const cleanupFoldersOrFiles = async (srcToClean) => {
  const deletedPaths = await del(srcToClean)
  const colour = green.bold
  const logTitle = (deletedPaths.length) ? 'Deleted files and directories:\n' : 'No files/folders to clean'
  const logTitlePrefix = `${emoji.get('file_folder')}  - `

  if (deletedPaths.length) {
    log(colour(logTitlePrefix + logTitle), `          ${deletedPaths.join('\n           ')}`)
  } else {
    log(colour(logTitlePrefix + logTitle))
  }
}

const src = async (done) => {
  await cleanupFoldersOrFiles(['src/govuk-frontend'])
  await done()
}
src.displayName = 'clean:src'
src.description = 'Cleans `govuk-frontend` folder from src'

const pkg = async (done) => {
  await cleanupFoldersOrFiles(['package/govuk-frontend', 'package/digitalmarketplace'])
  await done()
}
pkg.displayName = 'clean:package'
pkg.description = 'Cleans `govuk-frontend` and `digitalmarketplace` folder from package'

module.exports = {
  src,
  pkg,
  all: parallel(src, pkg)
}
