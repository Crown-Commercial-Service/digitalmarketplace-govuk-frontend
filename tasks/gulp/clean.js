const { task } = require('gulp')
const del = require('del')
const emoji = require('node-emoji')
const { green } = require('chalk')
const log = require('fancy-log')

task('clean', async (done) => {
  const deletedPaths = await del(['package/govuk-frontend'])
  const colour = green.bold
  const logTitle = (deletedPaths.length)? `Deleted files and directories:\n`: 'No files/folders to clean'
  const logTitlePrefix = `${emoji.get('file_folder')}  - `

  if (deletedPaths.length) {
    log(colour(logTitlePrefix + logTitle), `          ${deletedPaths.join('\n           ')}`)
  } else {
    log(colour(logTitlePrefix + logTitle))
  }

  return done
})
