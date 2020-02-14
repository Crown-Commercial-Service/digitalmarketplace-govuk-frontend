// Javascript code to support the Cookie Settings page
import { getConsentCookie, setConsentCookie } from '../../helpers/cookie/cookie-functions'
import InitialiseAnalytics from '../analytics/init'

export function CookieSettings ($module) {
  this.$module = $module
}

CookieSettings.prototype.init = function () {
  this.$module.submitSettingsForm = this.submitSettingsForm.bind(this)

  this.$module.addEventListener('submit', this.$module.submitSettingsForm)

  // Ensure there aren't two forms for setting cookie preferences on the same page
  this.hideCookieBanner()

  this.setInitialFormValues()
}

CookieSettings.prototype.setInitialFormValues = function () {
  var currentConsentCookie = getConsentCookie()

  if (!currentConsentCookie) {
    // Don't populate the form
    return
  }

  this.hideWarningMessage()

  // Populate the form with the existing choice
  var radioButton
  if (currentConsentCookie.analytics) {
    radioButton = this.$module.querySelector('input[name=cookies-analytics][value=On]')
  } else {
    radioButton = this.$module.querySelector('input[name=cookies-analytics][value=Off]')
  }
  radioButton.checked = true
}

CookieSettings.prototype.submitSettingsForm = function (event) {
  event.preventDefault()

  var formInputs = event.target.querySelectorAll('input[name=cookies-analytics]')
  var options = {}

  // Retrieve the selected value from the form inputs
  for (var i = 0; i < formInputs.length; i++) {
    var input = formInputs[i]
    if (input.checked) {
      var value = input.value === 'On'

      options.analytics = value
      break
    }
  }
  // the cookie choice must be set when form is submitted
  if (options.analytics === undefined) {
    this.showErrorMessage()
    return false
  }

  // Set the analytics cookie preferences
  // If 'Off' option not checked, this function will also delete any existing Google Analytics cookies
  setConsentCookie(options)

  // If 'On' option checked and analytics not yet present,
  // initialise Analytics (this includes firing the initial pageview)
  if (options.analytics && !window.DMGOVUKFrontend.analytics) {
    InitialiseAnalytics()
  }

  this.hideWarningMessage()
  this.hideErrorMessage()
  this.showConfirmationMessage()

  return false
}

CookieSettings.prototype.showConfirmationMessage = function () {
  var confirmationMessage = document.querySelector('#dm-cookie-settings-confirmation')
  var previousPageLink = document.querySelector('.dm-cookie-settings__prev-page')
  var referrer = CookieSettings.prototype.getReferrerLink()

  document.body.scrollTop = document.documentElement.scrollTop = 0

  if (referrer && referrer !== document.location.pathname) {
    previousPageLink.href = referrer
    previousPageLink.style.display = 'block'
  } else {
    previousPageLink.style.display = 'none'
  }

  confirmationMessage.style.display = 'block'
}

CookieSettings.prototype.showErrorMessage = function () {
  var errorMessage = document.querySelector('#dm-cookie-settings-error')
  if (errorMessage !== null) {
    errorMessage.style.display = 'block'
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }
}

CookieSettings.prototype.hideErrorMessage = function () {
  var errorMessage = document.querySelector('#dm-cookie-settings-error')
  if (errorMessage !== null) {
    errorMessage.style.display = 'none'
  }
}

CookieSettings.prototype.hideWarningMessage = function () {
  var warningMessage = document.querySelector('#dm-cookie-settings-warning')
  if (warningMessage !== null) {
    warningMessage.style.display = 'none'
  }
}

CookieSettings.prototype.hideCookieBanner = function () {
  var cookieBanner = document.querySelector('.dm-cookie-banner')
  if (cookieBanner !== null) {
    cookieBanner.style.display = 'none'
  }
}

CookieSettings.prototype.getReferrerLink = function () {
  return document.referrer ? new URL(document.referrer).pathname : false
}

export default CookieSettings
