/**
 * @jest-environment jsdom
 */
import { getCookie, setCookie, setConsentCookie, setDefaultConsentCookie } from '../../helpers/cookie/cookie-functions'
import * as CookieSettings from './cookie-settings'

jest.mock('../../helpers/cookie/cookie-functions')

describe('Cookie settings', () => {
  beforeEach(() => {
    CookieSettings()
    getCookie.mockClear()
    setCookie.mockClear()
    setConsentCookie.mockClear()
    setDefaultConsentCookie.mockClear()

    // TODO: add form element to the document
  })

  afterEach(() => {
    // initAnalytics sets up a new window.DMGOVUKFrontend.analytics which needs clearing
    delete window.DMGOVUKFrontend.analytics
  })

  it('adds event listener to submit button', () => {

  })

  describe('If there are no existing analytics preferences', () => {
    it('the settings form will be populated with Off selected as a default', () => {

    })

    it('the default consent cookie will be set', () => {
      expect(setDefaultConsentCookie).toHaveBeenCalled()
    })

    it('Google Analytics will be disabled', () => {
      expect(window['ga-disable-UA-26179049-1']).toBe(true)
    })

    it('The warning banner will be shown', () => {

    })

    it('The error banner will be hidden', () => {

    })

    it('The confirmation banner will be hidden', () => {

    })
  })

  describe('If existing analytics preferences have been set to Off', () => {
    it('the settings form will be populated with Off selected', () => {

    })

    it('Google Analytics will be disabled', () => {
      expect(window['ga-disable-UA-26179049-1']).toBe(true)
    })

    it('The warning banner will be hidden', () => {

    })

    it('The error banner will be hidden', () => {

    })

    it('The confirmation  banner will be hidden', () => {

    })
  })

  describe('If existing analytics preferences have been set to On', () => {
    it('the settings form will be populated with On selected', () => {

    })

    it('Google Analytics will be enabled', () => {
      expect(window['ga-disable-UA-26179049-1']).toBe(false)
    })

    it('The warning banner will be hidden', () => {

    })

    it('The error banner will be hidden', () => {

    })

    it('The confirmation banner will be hidden', () => {

    })
  })

  describe('If the user updates their preference to turn Off analytics', () => {
    it('the settings form will be populated with Off selected', () => {

    })

    it('a cookie_preferences_set cookie will be set', () => {
      expect(setCookie).toHaveBeenCalled()  // with the Off option
    })

    it('a seen_cookie_message cookie will be set', () => {
      expect(setCookie).toHaveBeenCalled()  // hide the message for 365 days
    })

    it('Google Analytics will be disabled', () => {
      expect(window['ga-disable-UA-26179049-1']).toBe(true)
    })

    it('The confirmation banner will be shown', () => {

    })

    it('The warning banner will be hidden', () => {

    })

    it('The error banner will be hidden', () => {

    })
  })

  describe('If the user updates their preference to turn On analytics', () => {
    it('the settings form will be populated with On selected', () => {

    })

    it('a consent cookie will be set', () => {
      expect(setConsentCookie).toHaveBeenCalled()
    })

    it('a cookie preferences cookie will be set', () => {
      expect(setCookie).toHaveBeenCalled()  // with the On option
    })

    it('a seen_cookie_message cookie will be set', () => {
      expect(setCookie).toHaveBeenCalled()  // hide the message for 365 days
    })

    it('Google Analytics will be enabled', () => {
      expect(window['ga-disable-UA-26179049-1']).toBe(false)
    })

    it('a tracking event for setting preferences will be fired', () => {

    })

    it('The confirmation banner will be shown', () => {

    })

    it('The warning banner will be hidden', () => {

    })

    it('The error banner will be hidden', () => {

    })
  })

  describe('If the user submits an empty form', () => {
    it('the settings form will be populated with Off selected by default', () => {

    })

    it('Google Analytics will be disabled', () => {
      expect(window['ga-disable-UA-26179049-1']).toBe(true)
    })

    it('The confirmation banner will be hidden', () => {

    })

    it('The error banner will be shown', () => {

    })
  })
})
