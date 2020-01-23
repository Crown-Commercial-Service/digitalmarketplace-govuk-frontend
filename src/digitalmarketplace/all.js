import CookieBanner from './components/cookie-banner/cookie-banner'

import initAnalytics from './components/analytics/init'

function initAll (options) {
  const $cookieBanner = document.querySelector('[data-module="dm-cookie-banner"]')
  if ($cookieBanner) {
    new CookieBanner($cookieBanner).init()
  }
}

export {
  initAll,
  initAnalytics,
  CookieBanner
}
