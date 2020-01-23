/**
 * @jest-environment jsdom
 */
import CookieBanner from './cookie-banner'
import Cookie from '../helpers/cookie/cookie-functions'
import initAnalytics from '../analytics/init'
const axe = require('../../../../lib/axe-helper')
const jquery = require('jquery')

const { render, getExamples } = require('../../../../lib/jest-helpers.js')
const examples = getExamples('cookie-banner')

jest.mock('../analytics/init')

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods
  initAnalytics.mockClear()
})

describe('cookie-banner component', () => {
  it('default example passes accessibility tests', async () => {
    const $ = render('cookie-banner', examples.default)
    const results = await axe($.html())
    expect(results).toHaveNoViolations()
  })

  it('renders a cookie banner with visible content and buttons', () => {
    const $ = render('cookie-banner', examples.default)
    expect($.html()).toMatchSnapshot()
    const mainContent = $('.dm-cookie-banner__wrapper')
    expect(mainContent.is('hidden')).toBe(false)
  })

  it('the confirmation message is hidden by default', () => {
    const $ = render('cookie-banner', examples.default)
    const confirmationBanner = $('.dm-cookie-confirmation')
    expect(confirmationBanner.is('hidden')).toBe(true)
  })

  it('renders a cookie banner with a custom component ID', () => {
    const $ = render('cookie-banner', examples['with custom componentID'])
    const $component = $('.dm-cookie-banner')
    expect($component.attr('id')).toEqual('my-custom-component-id')
  })

  it('renders a cookie banner with a custom service name', () => {
    const $ = render('cookie-banner', examples['with custom service name'])
    const cookieInfoLink = $('.dm-cookie-banner__link').html().trim()
    expect(cookieInfoLink).toEqual('How Digital Marketplace Admin uses cookies')
  })
})

describe('cookie-banner new user', () => {
  let $cookieBanner
  beforeEach(() => {
    const $cookieBanner = render('cookie-banner', examples.default)
    new CookieBanner($cookieBanner).init()
  })

  it('who has not consented should see the cookie banner', () => {
    const mainContent = $cookieBanner('.dm-cookie-banner__wrapper')
    expect(mainContent.is('hidden')).toBe(false)
  })

  it('who has not consented should not have analytics running', () => {
    expect(initAnalytics).not.toHaveBeenCalled()
  })
})

describe('cookie-banner returning user', () => {
  it('with consent cookie set should not see the cookie banner', () => {
    Cookie('analytics', true)
    const $cookieBanner = render('cookie-banner', examples.default)
    CookieBanner($cookieBanner).init()

    const mainContent = $cookieBanner('.dm-cookie-banner__wrapper')
    expect(mainContent.is('hidden')).toBe(true)
  })

  it('with consent cookie set to accept analytics should have analytics enabled', () => {
    Cookie('analytics', true)
    CookieBanner.init()
    expect(initAnalytics).toHaveBeenCalledTimes(1)
  })

  it('with consent cookie set to reject analytics should not have analytics enabled', () => {
    Cookie('analytics', false)
    CookieBanner.init()
    expect(initAnalytics).not.toHaveBeenCalled()
  })
})

describe('cookie-banner accepting analytics', () => {
  let $cookieBanner
  beforeEach(() => {
    const $cookieBanner = render('cookie-banner', examples.default)
    CookieBanner($cookieBanner).init()

    const acceptButton = $cookieBanner('.dm-cookie-banner__button-accept button')
    jquery(acceptButton).click()
  })

  it('new user accepting analytics should see confirmation', () => {
    const mainContent = $cookieBanner('.dm-cookie-banner__wrapper')
    const confirmationBanner = $cookieBanner('.dm-cookie-confirmation')

    expect(mainContent.is('hidden')).toBe(true)
    expect(confirmationBanner.is('hidden')).toBe(false)
  })

  it('new user accepting analytics should set consent cookie', () => {
    expect(CookieBanner.setCookieConsent).toHaveBeenCalled()
  })

  it('new user accepting analytics should have analytics enabled', () => {
    expect(initAnalytics).not.toHaveBeenCalled()
  })

  it('clicking Hide after accepting should hide the cookie banner', () => {
    const hideButton = $cookieBanner('.dm-cookie-banner__hide-button')

    jquery(hideButton).click()

    expect($cookieBanner.is('hidden')).toBe(true)
  })
})

describe('cookie-banner rejecting analytics', () => {
  let $cookieBanner
  beforeEach(() => {
    CookieBanner.init()
    const $cookieBanner = render('cookie-banner', examples.default)
    const rejectButton = $cookieBanner('.dm-cookie-banner__button-reject button')

    jquery(rejectButton).click()
  })

  it('new user rejecting analytics should see confirmation', () => {
    const buttonBanner = $cookieBanner('.dm-cookie-banner__wrapper')
    const confirmationBanner = $cookieBanner('.dm-cookie-confirmation')

    expect(buttonBanner.is('hidden')).toBe(true)
    expect(confirmationBanner.is('hidden')).toBe(false)
  })

  it('new user rejecting analytics should set consent cookie', () => {
    expect(CookieBanner.setCookieConsent).toHaveBeenCalled()
  })

  it('new user rejecting analytics should not have analytics enabled', () => {
    expect(initAnalytics).not.toHaveBeenCalled()
  })

  it('clicking Hide after rejecting should hide the cookie banner', () => {
    const hideButton = $cookieBanner('.dm-cookie-banner__hide-button')

    jquery(hideButton).click()

    expect($cookieBanner.is('hidden')).toBe(true)
  })
})
