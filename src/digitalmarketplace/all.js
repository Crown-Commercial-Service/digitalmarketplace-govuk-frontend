import { nodeListForEach } from './common'
import ListEntry from './components/list-entry/list-entry'

function initAll (options) {
  // Set the options to an empty object by default if no options are passed.
  options = typeof options !== 'undefined' ? options : {}

  // Allow the user to initialise Digital Marketplace GOV.UK Frontend in only
  // certain sections of the page
  // Defaults to the entire document if nothing is set.
  var scope = typeof options.scope !== 'undefined' ? options.scope : document

  var $listEntry = scope.querySelectorAll('[data-module="dm-list-entry"]')
  nodeListForEach($listEntry, function ($listEntry) {
    new ListEntry($listEntry).init()
  })
}

export {
  initAll,
  ListEntry
}
