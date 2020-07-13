import CookieBanner from './components/cookie-banner/cookie-banner'
import CookieSettings from './components/cookie-settings/cookie-settings'
import * as Analytics from './components/analytics/analytics'
import initAnalytics from './components/analytics/init'
import { getConsentCookie } from './helpers/cookie/cookie-functions'
import { nodeListForEach } from './common'
import ListEntry from './components/list-entry/list-entry'

function initAll (options) {
  // Set the options to an empty object by default if no options are passed.
  options = typeof options !== 'undefined' ? options : {}

  // Allow the user to initialise Digital Marketplace GOV.UK Frontend in only
  // certain sections of the page
  // Defaults to the entire document if nothing is set.
  var scope = typeof options.scope !== 'undefined' ? options.scope : document

  const $cookieBanner = document.querySelector('[data-module="dm-cookie-banner"]')
  if ($cookieBanner) {
    new CookieBanner($cookieBanner).init()
  }
  const $cookieSettingsPage = document.querySelector('[data-module="dm-cookie-settings"]')
  if ($cookieSettingsPage) {
    new CookieSettings($cookieSettingsPage).init()
  }
  const currentConsentCookie = getConsentCookie()
  if (currentConsentCookie && currentConsentCookie.analytics) {
    initAnalytics()
  }

  var $listEntry = scope.querySelectorAll('[data-module="dm-list-entry"]')
  nodeListForEach($listEntry, function ($listEntry) {
    new ListEntry($listEntry).init()
  })
}

export {
  initAll,
  initAnalytics,
  Analytics,
  CookieBanner,
  CookieSettings,
  ListEntry
}
