import CookieBanner from './components/cookie-banner/cookie-banner'
import CookieSettings from './components/cookie-settings/cookie-settings'
import * as Analytics from './components/analytics/analytics'
import initAnalytics from './components/analytics/init'

function initAll (options) {
  const $cookieBanner = document.querySelector('[data-module="dm-cookie-banner"]')
  if ($cookieBanner) {
    new CookieBanner($cookieBanner).init()
  }
  const $cookieSettingsPage = document.querySelector('[data-module="dm-cookie-settings"]')
  if ($cookieSettingsPage) {
    new CookieSettings($cookieSettingsPage).init()
  }
}

export {
  initAll,
  initAnalytics,
  Analytics,
  CookieBanner,
  CookieSettings
}
