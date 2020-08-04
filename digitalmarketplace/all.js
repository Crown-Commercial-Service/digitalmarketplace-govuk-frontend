"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define('DMGOVUKFrontend', ['exports'], factory) : (global = global || self, factory(global.DMGOVUKFrontend = {}));
})(void 0, function (exports) {
  'use strict';

  (function (undefined$1) {
    // Detection from https://raw.githubusercontent.com/Financial-Times/polyfill-library/master/polyfills/NodeList/prototype/forEach/detect.js
    var detect = ('forEach' in NodeList.prototype);
    if (detect) return; // Polyfill from https://raw.githubusercontent.com/Financial-Times/polyfill-service/1f3c09b402f65bf6e393f933a15ba63f1b86ef1f/packages/polyfill-library/polyfills/Element/prototype/matches/polyfill.js

    NodeList.prototype.forEach = Array.prototype.forEach;
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {}); // used by the cookie banner component

  var DEFAULT_COOKIE_CONSENT = {
    analytics: false
  };
  var COOKIE_CATEGORIES = {
    _ga: 'analytics',
    _gid: 'analytics',
    _gat_govuk_shared: 'analytics'
  };

  function getCookie(name) {
    var nameEQ = name + '=';
    var cookies = document.cookie.split(';');

    for (var i = 0, len = cookies.length; i < len; i++) {
      var cookie = cookies[i];

      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length);
      }

      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }

    return null;
  }
  /*
  Cookie methods
  ==============
   Usage:
     Setting a cookie:
    setCookie('hobnob', 'tasty', { days: 30 })
     Reading a cookie:
    getCookie('hobnob')
     Deleting a cookie:
    Cookie('hobnob', null)
  */


  function Cookie(name, value, options) {
    if (typeof value !== 'undefined') {
      if (value === false || value === null) {
        return setCookie(name, '', {
          days: -1
        });
      } else {
        // Default expiry date of 30 days
        if (typeof options === 'undefined') {
          options = {
            days: 30
          };
        }

        return setCookie(name, value, options);
      }
    } else {
      return getCookie(name);
    }
  }

  function getConsentCookie() {
    var consentCookie = getCookie('dm_cookies_policy');
    var consentCookieObj;

    if (consentCookie) {
      try {
        consentCookieObj = JSON.parse(consentCookie);
      } catch (err) {
        return null;
      }

      if (_typeof(consentCookieObj) !== 'object' && consentCookieObj !== null) {
        consentCookieObj = JSON.parse(consentCookieObj);
      }
    } else {
      return null;
    }

    return consentCookieObj;
  }

  function setConsentCookie(options) {
    var cookieConsent = getConsentCookie();

    if (!cookieConsent) {
      cookieConsent = JSON.parse(JSON.stringify(DEFAULT_COOKIE_CONSENT));
    }

    for (var cookieType in options) {
      cookieConsent[cookieType] = options[cookieType]; // Delete cookies of that type if consent being set to false

      if (!options[cookieType]) {
        for (var cookie in COOKIE_CATEGORIES) {
          if (COOKIE_CATEGORIES[cookie] === cookieType) {
            Cookie(cookie, null);

            if (Cookie(cookie)) {
              document.cookie = cookie + '=;expires=' + new Date() + ';domain=' + window.location.hostname.replace(/^www\./, '.') + ';path=/';
            }
          }
        }
      }
    }

    setCookie('dm_cookies_policy', JSON.stringify(cookieConsent), {
      days: 365
    });
  }

  function checkConsentCookieCategory(cookieName, cookieCategory) {
    var currentConsentCookie = getConsentCookie(); // If the consent cookie doesn't exist, but the cookie is in our known list, return true

    if (!currentConsentCookie && COOKIE_CATEGORIES[cookieName]) {
      return true;
    }

    currentConsentCookie = getConsentCookie(); // Sometimes currentConsentCookie is malformed in some of the tests, so we need to handle these

    try {
      return currentConsentCookie[cookieCategory];
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  function checkConsentCookie(cookieName, cookieValue) {
    // If we're setting the consent cookie OR deleting a cookie, allow by default
    if (cookieName === 'dm_cookies_policy' || cookieValue === null || cookieValue === false) {
      return true;
    }

    if (COOKIE_CATEGORIES[cookieName]) {
      var cookieCategory = COOKIE_CATEGORIES[cookieName];
      return checkConsentCookieCategory(cookieName, cookieCategory);
    } else {
      // Deny the cookie if it is not known to us
      return false;
    }
  } // Usage :
  // Setting a cookie:
  // Cookie('hobnob', 'tasty', { days: 30 })


  function setCookie(name, value, options) {
    if (checkConsentCookie(name, value)) {
      if (typeof options === 'undefined') {
        options = {};
      }

      var cookieString = name + '=' + value + '; path=/';

      if (options.days) {
        var date = new Date();
        date.setTime(date.getTime() + options.days * 24 * 60 * 60 * 1000);
        cookieString = cookieString + '; expires=' + date.toGMTString();
      }

      if (document.location.protocol === 'https:') {
        cookieString = cookieString + '; Secure';
      }

      document.cookie = cookieString;
    }
  } // Based on https://github.com/alphagov/static/pull/1863


  var EMAIL_PATTERN = /[^\s=/?&]+(?:@|%40)[^\s=/?&]+/g; // Not quite sure what this is doing,
  // see https://github.com/alphagov/digitalmarketplace-frontend-toolkit/blob/master/toolkit/javascripts/analytics/_govukAnalytics.js#L19

  var PIISafe = function PIISafe(value) {
    this.value = value;
  };

  function stripPII(value) {
    if (typeof value === 'string') {
      return stripPIIFromString(value);
    } else if (Object.prototype.toString.call(value) === '[object Array]' || Object.prototype.toString.call(value) === '[object Arguments]') {
      return stripPIIFromArray(value);
    } else if (_typeof(value) === 'object') {
      return stripPIIFromObject(value);
    } else {
      return value;
    }
  }

  function stripPIIFromString(string) {
    return string.replace(EMAIL_PATTERN, '[email]');
  }

  function stripPIIFromObject(object) {
    if (object) {
      if (object instanceof PIISafe) {
        return object.value;
      } else {
        for (var property in object) {
          var value = object[property];
          object[property] = stripPII(value);
        }

        return object;
      }
    }
  }

  function stripPIIFromArray(array) {
    for (var i = 0, l = array.length; i < l; i++) {
      var elem = array[i];
      array[i] = stripPII(elem);
    }

    return array;
  } // Stripped-down wrapper for Google Analytics, based on:
  // https://github.com/alphagov/static/blob/master/doc/analytics.md


  function SetupAnalytics(config) {
    window.ga('create', config.trackingId, config.cookieDomain, {
      cookieExpires: config.expires * 24 * 60 * 60
    });
    window.ga('set', 'anonymizeIp', config.anonymizeIp);
    window.ga('set', 'displayFeaturesTask', config.displayFeaturesTask);
    window.ga('set', 'transport', config.transport);
  }

  function LoadGoogleAnalytics() {
    /* eslint-disable */
    // Copied from Google Analytics installation instructions

    /* jshint ignore:start */
    (function (i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r;
      i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments);
      }, i[r].l = 1 * new Date();
      a = s.createElement(o), m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
    /* jshint ignore:end */

  }

  function TrackPageview(path, title, options) {
    var page = window.location.pathname + window.location.search;
    window.ga('send', 'pageview', stripPII(page));
  } // https://developers.google.com/analytics/devguides/collection/analyticsjs/events


  function TrackEvent(category, action, options) {
    options = options || {};
    var evt = {
      eventCategory: category,
      eventAction: action
    };

    if (options.label) {
      evt.eventLabel = options.label;
      delete options.label;
    }

    if (_typeof(options) === 'object') {
      Object.assign(evt, options);
    }

    window.ga('send', 'event', stripPII(evt));
  }

  function AddLinkedTrackerDomain(trackingId, name, domains) {
    window.ga('create', trackingId, 'auto', {
      name: name
    }); // Load the plugin.

    window.ga('require', 'linker');
    window.ga(name + '.require', 'linker'); // Define which domains to autoLink.

    window.ga('linker:autoLink', domains);
    window.ga(name + '.linker:autoLink', domains);
    window.ga(name + '.set', 'anonymizeIp', true);
    window.ga(name + '.set', 'location', stripPII(window.location.href));
    window.ga(name + '.send', 'pageview');
  }

  var analytics = /*#__PURE__*/Object.freeze({
    __proto__: null,
    SetupAnalytics: SetupAnalytics,
    LoadGoogleAnalytics: LoadGoogleAnalytics,
    TrackPageview: TrackPageview,
    TrackEvent: TrackEvent,
    AddLinkedTrackerDomain: AddLinkedTrackerDomain
  });
  window.DMGOVUKFrontend = window.DMGOVUKFrontend || {}; // TODO: Remove hard coded tracking IDs to make this more generic and useful to others

  var trackingId = 'UA-49258698-1';
  var linkedTrackingId = 'UA-145652997-1';
  window["ga-disable-".concat(trackingId)] = true;

  function InitialiseAnalytics() {
    // guard against being called more than once
    if (!('analytics' in window.DMGOVUKFrontend)) {
      window["ga-disable-".concat(trackingId)] = false; // TODO: Check if we still need this hack for the domain

      var cookieDomain = document.domain === 'www.digitalmarketplace.service.gov.uk' ? '.digitalmarketplace.service.gov.uk' : document.domain; // Load Analytics libraries

      LoadGoogleAnalytics(); // Configure profiles and make interface public
      // for custom dimensions, virtual pageviews and events

      window.DMGOVUKFrontend.analytics = new SetupAnalytics({
        trackingId: trackingId,
        cookieDomain: cookieDomain,
        anonymizeIp: true,
        displayFeaturesTask: null,
        transport: 'beacon',
        expires: 365
      }); // Add cross-domain tracking for www.gov.uk domain

      AddLinkedTrackerDomain(linkedTrackingId, 'govuk_shared', ['www.gov.uk']); // Track initial pageview

      TrackPageview();
    }
  }

  var CookieBanner = function CookieBanner($module) {
    this.$module = $module;
  };

  CookieBanner.prototype.clearOldCookies = function () {
    // clear any cookies set by the previous version
    var oldCookies = ['seen_cookie_message', '_ga', '_gid'];

    for (var i = 0; i < oldCookies.length; i++) {
      if (getCookie(oldCookies[i])) {
        var cookieString = oldCookies[i] + '=;expires=' + new Date() + ';domain=' + window.location.hostname.replace(/^www\./, '.') + ';path=/';
        document.cookie = cookieString;
      }
    }
  };

  CookieBanner.prototype.init = function ($module) {
    this.$module.hideCookieMessage = this.hideCookieMessage.bind(this);
    this.$module.showConfirmationMessage = this.showConfirmationMessage.bind(this);
    this.$module.setCookieConsent = this.setCookieConsent.bind(this);
    this.$module.cookieBanner = document.querySelector('.dm-cookie-banner');
    this.$module.cookieBannerConfirmationMessage = this.$module.querySelector('.dm-cookie-banner__confirmation');
    this.setupCookieMessage();
  };

  CookieBanner.prototype.setupCookieMessage = function () {
    var _this = this;

    this.$hideLink = this.$module.querySelector('button[data-hide-cookie-banner]');

    if (this.$hideLink) {
      this.$hideLink.addEventListener('click', this.$module.hideCookieMessage);
    }

    this.$acceptCookiesLink = this.$module.querySelector('button[data-accept-cookies=true]');

    if (this.$acceptCookiesLink) {
      this.$acceptCookiesLink.addEventListener('click', function () {
        return _this.$module.setCookieConsent(true);
      });
    }

    this.$rejectCookiesLink = this.$module.querySelector('button[data-accept-cookies=false]');

    if (this.$rejectCookiesLink) {
      this.$rejectCookiesLink.addEventListener('click', function () {
        return _this.$module.setCookieConsent(false);
      });
    }

    this.showCookieMessage();
  };

  CookieBanner.prototype.showCookieMessage = function () {
    // Show the cookie banner if policy cookie not set
    var hasCookiesPolicy = getCookie('dm_cookies_policy');

    if (this.$module && !hasCookiesPolicy) {
      this.$module.style.display = 'block';
    }
  };

  CookieBanner.prototype.hideCookieMessage = function (event) {
    if (this.$module) {
      this.$module.style.display = 'none';
    }

    if (event.target) {
      event.preventDefault();
    }
  };

  CookieBanner.prototype.setCookieConsent = function (analyticsConsent) {
    setConsentCookie({
      analytics: analyticsConsent
    });
    this.$module.showConfirmationMessage(analyticsConsent);
    this.$module.cookieBannerConfirmationMessage.focus();

    if (analyticsConsent) {
      InitialiseAnalytics();
    }
  };

  CookieBanner.prototype.showConfirmationMessage = function (analyticsConsent) {
    var messagePrefix = analyticsConsent ? 'You’ve accepted analytics cookies.' : 'You told us not to use analytics cookies.';
    this.$cookieBannerMainContent = document.querySelector('.dm-cookie-banner__wrapper');
    this.$cookieBannerConfirmationMessage = document.querySelector('.dm-cookie-banner__confirmation-message');
    this.$cookieBannerConfirmationMessage.insertAdjacentText('afterbegin', messagePrefix);
    this.$cookieBannerMainContent.style.display = 'none';
    this.$module.cookieBannerConfirmationMessage.style.display = 'block';
  }; // Javascript code to support the Cookie Settings page


  function CookieSettings($module) {
    this.$module = $module;
  }

  CookieSettings.prototype.init = function () {
    this.$module.submitSettingsForm = this.submitSettingsForm.bind(this);
    this.$module.addEventListener('submit', this.$module.submitSettingsForm); // Ensure there aren't two forms for setting cookie preferences on the same page

    this.hideCookieBanner();
    this.setInitialFormValues();
  };

  CookieSettings.prototype.setInitialFormValues = function () {
    var currentConsentCookie = getConsentCookie();

    if (!currentConsentCookie) {
      // Don't populate the form
      return;
    }

    this.hideWarningMessage(); // Populate the form with the existing choice

    var radioButton;

    if (currentConsentCookie.analytics) {
      radioButton = this.$module.querySelector('input[name=cookies-analytics][value=On]');
    } else {
      radioButton = this.$module.querySelector('input[name=cookies-analytics][value=Off]');
    }

    radioButton.checked = true;
  };

  CookieSettings.prototype.submitSettingsForm = function (event) {
    event.preventDefault();
    var formInputs = event.target.querySelectorAll('input[name=cookies-analytics]');
    var options = {}; // Retrieve the selected value from the form inputs

    for (var i = 0; i < formInputs.length; i++) {
      var input = formInputs[i];

      if (input.checked) {
        var value = input.value === 'On';
        options.analytics = value;
        break;
      }
    } // the cookie choice must be set when form is submitted


    if (options.analytics === undefined) {
      this.showError();
      return false;
    } // Set the analytics cookie preferences
    // If 'Off' option not checked, this function will also delete any existing Google Analytics cookies


    setConsentCookie(options); // If 'On' option checked and analytics not yet present,
    // initialise Analytics (this includes firing the initial pageview)

    if (options.analytics && !window.DMGOVUKFrontend.analytics) {
      InitialiseAnalytics();
    }

    this.hideWarningMessage();
    this.hideError();
    this.showConfirmationMessage();
    return false;
  };

  CookieSettings.prototype.showConfirmationMessage = function () {
    var confirmationMessage = document.querySelector('#dm-cookie-settings-confirmation');
    var previousPageLink = document.querySelector('.dm-cookie-settings__prev-page');
    var referrer = CookieSettings.prototype.getReferrerLink();
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    if (referrer && referrer !== document.location.pathname) {
      previousPageLink.href = referrer;
      previousPageLink.style.display = 'block';
    } else {
      previousPageLink.style.display = 'none';
    }

    confirmationMessage.style.display = 'block';
  };

  CookieSettings.prototype.showError = function () {
    var errorSummary = document.querySelector('#dm-cookie-settings-error');

    if (errorSummary !== null) {
      errorSummary.style.display = 'block';
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    this.showErrorMessage();
  };

  CookieSettings.prototype.hideError = function () {
    var errorSummary = document.querySelector('#dm-cookie-settings-error');

    if (errorSummary !== null) {
      errorSummary.style.display = 'none';
    }

    this.hideErrorMessage();
  };

  CookieSettings.prototype.hideWarningMessage = function () {
    var warningMessage = document.querySelector('#dm-cookie-settings-warning');

    if (warningMessage !== null) {
      warningMessage.style.display = 'none';
    }
  };

  CookieSettings.prototype.hideErrorMessage = function () {
    var errorMessage = document.querySelector('#dm-cookie-settings-error-message');

    if (errorMessage !== null) {
      errorMessage.style.display = 'none';
    }

    var errorMessageHighlight = document.querySelector('.govuk-form-group--error');
    errorMessageHighlight && errorMessageHighlight.classList.remove('govuk-form-group--error');
  };

  CookieSettings.prototype.showErrorMessage = function () {
    var formGroup = document.querySelector('#dm-cookie-settings .govuk-form-group');
    formGroup && formGroup.classList.add('govuk-form-group--error');
    var errorMessageSpan = document.createElement('span');
    errorMessageSpan.setAttribute('id', 'dm-cookie-settings-error-message');
    errorMessageSpan.className = 'govuk-error-message';
    errorMessageSpan.innerHTML = '<span class="govuk-visually-hidden">Error:</span> Select yes to accept analytics cookies';
    var siblingElement = document.querySelector('#cookie-settings-1, .govuk-radios--inline');
    var parentElement = siblingElement.parentElement;
    parentElement.insertBefore(errorMessageSpan, siblingElement);
  };

  CookieSettings.prototype.hideCookieBanner = function () {
    var cookieBanner = document.querySelector('.dm-cookie-banner');

    if (cookieBanner !== null) {
      cookieBanner.style.display = 'none';
    }
  };

  CookieSettings.prototype.getReferrerLink = function () {
    return document.referrer ? new URL(document.referrer).pathname : false;
  };

  var getSibling = function getSibling(direction, elem, selector) {
    // Get the next sibling element
    var sibling = direction === 'next' ? elem.nextElementSibling : elem.previousElementSibling; // If there's no selector, return the first sibling

    if (!selector) return sibling; // If the sibling matches our selector, use it
    // If not, jump to the next sibling and continue the loop
    // For IE10,11 (Polyfill for matches)

    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }

    while (sibling) {
      if (sibling.matches(selector)) return sibling;
      sibling = direction === 'next' ? sibling.nextElementSibling : sibling = sibling.previousElementSibling;
    }
  };

  function ListInput($module) {
    this.$module = $module;
    this.$allVisibleItems = $module.querySelectorAll('.dm-list-input__item--visible');
    this.$addAnotherButton = $module.querySelector('.dm-list-input__item-add');
    this.$allItems = $module.querySelectorAll('.dm-list-input__item');
    this.visibleItems = 0;
    this.itemContainerClass = 'dm-list-input__item-container';
    this.hiddenItemClass = 'dm-list-input__item--hidden';
    this.visibleItemClass = 'dm-list-input__item--visible';
    this.itemInputClass = 'dm-list-input__item-input';
    this.itemErrorClass = 'dm-list-input__item--error';
    this.itemErrorMsgClass = 'dm-list-input-error-message';
    this.itemCounterClass = 'dm-list-input__counter';
    this.inputErrorClass = 'govuk-input--error';
    this.removeButtonClass = 'dm-list-input__item-remove';
    this.hiddenRemoveButtonClass = 'dm-list-input__item-remove--hidden';
    this.formGroupErrorClass = 'govuk-form-group--error';
    this.hiddenAddButtonClass = 'dm-list-input__item-add--hidden';
    this.addButtonRemainingClass = 'dm-list-input__js-remaining-counter';
  }

  ListInput.prototype.init = function () {
    // Check for module
    if (!this.$module) {
      return;
    }

    this.hideEmptyItems();
    this.updateAllCounters();
    this.bindRemoveClickEvent();
    this.toggleAddAnotherButton();
    this.bindAddClickEvent();
  }; // Hide all items that do not have a value (except for the first one, or the first two if no items have a value)


  ListInput.prototype.hideEmptyItems = function () {
    var numberOfVisibleEmptyItems = 0;
    var numberOfFilledInItems = 0;
    this.$allItems.forEach(function ($item) {
      var $input = $item.querySelector('.' + this.itemInputClass);
      var $removeButton = $item.querySelector('.' + this.removeButtonClass);

      if ($input.value === '') {
        if (numberOfVisibleEmptyItems === 0) {
          $removeButton.classList.remove(this.hiddenRemoveButtonClass);
        } else if (numberOfVisibleEmptyItems === 1 && numberOfFilledInItems === 0) {
          $removeButton.classList.remove(this.hiddenRemoveButtonClass);
        } else {
          $item.classList.add(this.hiddenItemClass);
          $item.classList.remove(this.visibleItemClass);
          $removeButton.classList.add(this.hiddenRemoveButtonClass);
          $input.setAttribute('disabled', 'true');
        }

        numberOfVisibleEmptyItems += 1;
      } else {
        $item.classList.remove(this.hiddenItemClass);
        $item.classList.add(this.visibleItemClass);
        $removeButton.classList.remove(this.hiddenRemoveButtonClass);
        numberOfFilledInItems += 1;
      }
    }, this);
    this.$allVisibleItems = this.$module.querySelectorAll('.' + this.visibleItemClass);
  }; // Binds an event listener to module to listen for any
  // click events fired by the items "Remove" button


  ListInput.prototype.bindRemoveClickEvent = function () {
    this.$module.addEventListener('click', function (event) {
      var $clickedEl = event.target;

      if ($clickedEl.tagName === 'BUTTON' && $clickedEl.classList.contains(this.removeButtonClass)) {
        var $item = $clickedEl.parentNode.parentNode; // Remove the input's content and remove its value attribute

        var $input = $item.querySelector('.' + this.itemInputClass);
        $input.value = '';
        $input.removeAttribute('value');
        $input.setAttribute('disabled', 'true');
        $clickedEl.classList.add(this.hiddenRemoveButtonClass);
        $item.classList.add(this.hiddenItemClass);
        $item.classList.remove(this.visibleItemClass);
        this.$allVisibleItems = this.$module.querySelectorAll('.' + this.visibleItemClass); // Remove Error messages and styling

        if ($item.classList.contains(this.itemErrorClass)) {
          $item.classList.remove(this.itemErrorClass);
          var $errorFormGroup = $item.querySelector('.' + this.formGroupErrorClass);
          $errorFormGroup.classList.remove(this.formGroupErrorClass);
          $errorFormGroup.querySelector('.' + this.itemErrorMsgClass).remove();
          var $errorInput = $errorFormGroup.querySelector('.' + this.inputErrorClass);
          var inputId = $errorInput.getAttribute('id');
          var inputDescribedBy = $errorInput.getAttribute('aria-describedby');
          $errorInput.setAttribute('aria-describedby', inputDescribedBy.replace(inputId + '-error', ''));
          $errorInput.classList.remove(this.inputErrorClass);
        } // Hide Remove buttons if there is only one item left


        if (this.$allVisibleItems.length === 1) {
          var $removeButtons = this.$module.querySelectorAll('.' + this.removeButtonClass);
          $removeButtons.forEach(function ($button) {
            $button.classList.add(this.hiddenRemoveButtonClass);
          }, this);
          this.$allVisibleItems[0].querySelector('input').focus();
        } else {
          // Set focus to the next input
          var $nextVisibleItem = getSibling('next', $item, '.' + this.visibleItemClass);

          if ($nextVisibleItem) {
            $nextVisibleItem.querySelector('input').focus();
          } else {
            var $previousVisibleItem = getSibling('previous', $item, '.' + this.visibleItemClass);
            $previousVisibleItem.querySelector('input').focus();
          }
        }

        this.updateAllCounters();
        this.toggleAddAnotherButton();
      }
    }.bind(this));
  }; // Used to update each item's label and remove button hidden text


  ListInput.prototype.updateCounters = function () {
    var $visibleItems = this.$allVisibleItems;
    var counter = 1;
    $visibleItems.forEach(function (item) {
      var $counters = item.querySelectorAll('.' + this.itemCounterClass);
      $counters.forEach(function ($counter) {
        $counter.innerHTML = counter;
      });
      counter += 1;
    }, this);
  }; // Used to update "Add another" buttons "Remaining" counter
  // and sets focus to the new additional input


  ListInput.prototype.updateRemainingCounter = function () {
    var $visibleItems = this.$allVisibleItems;
    var totalItems = this.$allItems.length;
    this.$module.querySelector('.' + this.addButtonRemainingClass).innerHTML = totalItems - $visibleItems.length;
  };

  ListInput.prototype.bindAddClickEvent = function () {
    this.$addAnotherButton.addEventListener('click', function () {
      // Find the first hidden item
      var $firstHiddenItem = this.$module.querySelector('.' + this.hiddenItemClass);
      var $firstHiddenInput = $firstHiddenItem.querySelector('.' + this.itemInputClass);

      if ($firstHiddenItem) {
        $firstHiddenInput.removeAttribute('disabled');
        this.$module.querySelector('.' + this.itemContainerClass).appendChild($firstHiddenItem);
        $firstHiddenItem.classList.remove(this.hiddenItemClass);
        $firstHiddenItem.classList.add(this.visibleItemClass);
        this.$allVisibleItems = this.$module.querySelectorAll('.' + this.visibleItemClass);
        this.updateAllCounters();
        $firstHiddenItem.querySelector('.' + this.removeButtonClass).classList.remove(this.hiddenRemoveButtonClass);
        $firstHiddenInput.focus();
        this.toggleAddAnotherButton(); // Show Remove buttons if there is more one item

        if (this.$allVisibleItems.length > 1) {
          var $removeButtons = this.$module.querySelectorAll('.' + this.removeButtonClass);
          $removeButtons.forEach(function ($button) {
            $button.classList.remove(this.hiddenRemoveButtonClass);
          }, this);
        }
      }
    }.bind(this));
  };

  ListInput.prototype.toggleAddAnotherButton = function () {
    var $firstHiddenItem = this.$module.querySelector('.' + this.hiddenItemClass);

    if ($firstHiddenItem) {
      this.$addAnotherButton.classList.remove(this.hiddenAddButtonClass);
    } else {
      this.$addAnotherButton.classList.add(this.hiddenAddButtonClass);
    }
  };

  ListInput.prototype.updateAllCounters = function () {
    this.updateCounters();
    this.updateRemainingCounter();
  };

  function initAll(options) {
    // Set the options to an empty object by default if no options are passed.
    options = typeof options !== 'undefined' ? options : {}; // Allow the user to initialise Digital Marketplace GOV.UK Frontend in only
    // certain sections of the page
    // Defaults to the entire document if nothing is set.

    var scope = typeof options.scope !== 'undefined' ? options.scope : document;
    var $cookieBanner = document.querySelector('[data-module="dm-cookie-banner"]');

    if ($cookieBanner) {
      new CookieBanner($cookieBanner).init();
    }

    var $cookieSettingsPage = document.querySelector('[data-module="dm-cookie-settings"]');

    if ($cookieSettingsPage) {
      new CookieSettings($cookieSettingsPage).init();
    }

    var currentConsentCookie = getConsentCookie();

    if (currentConsentCookie && currentConsentCookie.analytics) {
      InitialiseAnalytics();
    }

    var $ListInput = scope.querySelectorAll('[data-module="dm-list-input"]');
    $ListInput.forEach(function ($ListInput) {
      new ListInput($ListInput).init();
    });
  }

  exports.Analytics = analytics;
  exports.CookieBanner = CookieBanner;
  exports.CookieSettings = CookieSettings;
  exports.ListInput = ListInput;
  exports.initAll = initAll;
  exports.initAnalytics = InitialiseAnalytics;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});