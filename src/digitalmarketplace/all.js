import CookieBanner from './components/cookie-banner/cookie-banner'

function initAll (options) {
  const $cookieBanner = document.querySelector('[data-module="dm-cookie-banner')
  if ($cookieBanner) {
    new CookieBanner($cookieBanner).init()
  }
}

export {
  initAll,
  CookieBanner
}
