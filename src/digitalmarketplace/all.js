import CookieBanner from './components/cookie-banner/cookie-banner'

import Analytics from './components/analytics/analytics'

function initAll (options) {
  const $cookieBanner = document.querySelector('[data-module="dm-cookie-banner')
  if ($cookieBanner) {
    new CookieBanner($cookieBanner).init()
  }
}

export {
  initAll,
  Analytics,
  CookieBanner
}
