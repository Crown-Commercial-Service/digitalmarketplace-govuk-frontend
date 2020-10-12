import './vendor/polyfills/NodeList/prototype/forEach'
import CookieBanner from './components/cookie-banner/cookie-banner'
import CookieSettings from './components/cookie-settings/cookie-settings'
import * as Analytics from './components/analytics/analytics'
import initAnalytics from './components/analytics/init'
import { getConsentCookie } from './helpers/cookie/cookie-functions'
import ListInput from './components/list-input/list-input'
import OptionSelect from './components/option-select/option-select'
import SearchBox from './components/search-box/search-box'
import Expander from './components/expander/expander'

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

  var $ListInput = scope.querySelectorAll('[data-module="dm-list-input"]')
  $ListInput.forEach(function ($ListInput) {
    new ListInput($ListInput).init()
  })

  var $OptionSelect = scope.querySelectorAll('[data-module="dm-option-select"]')
  $OptionSelect.forEach(function ($OptionSelect) {
    new OptionSelect($OptionSelect).init()
  })

  var $SearchBox = scope.querySelectorAll('[data-module="dm-search-box"]')
  $SearchBox.forEach(function ($SearchBox) {
    new SearchBox($SearchBox).init()
  })

  var $Expander = scope.querySelectorAll('[data-module="dm-expander"]')
  $Expander.forEach(function ($Expander) {
    new Expander($Expander).init()
  })
}

export {
  initAll,
  initAnalytics,
  Analytics,
  CookieBanner,
  CookieSettings,
  Expander,
  ListInput,
  OptionSelect,
  SearchBox
}
