const axe = require('../../../../lib/axe-helper')
const jquery = require('jquery')

const { render, getExamples } = require('../../../../lib/jest-helpers.js')
const CookieBanner = require('./cookie-banner')
const Analytics = require('../analytics/analytics')
const examples = getExamples('cookie-banner')

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
  beforeEach(() => {
    // TODO: use jest mock instead of spyOn
    // spyOn(Analytics, 'init').and.callThrough()
    CookieBanner.init()
  })

  it('who has not consented should see the cookie banner', () => {
    const $ = render('cookie-banner', examples.default)
    const mainContent = $('.dm-cookie-banner__wrapper')
    expect(mainContent.is('hidden')).toBe(false)
  })

  it('who has not consented should not have analytics running', () => {
    expect(Analytics.init).not.toHaveBeenCalled()
  })
})

describe('cookie-banner returning user', () => {
  beforeEach(() => {
    // TODO: use jest mock instead of spyOn
    // spyOn(Analytics, 'init').and.callThrough()
  })

  it('with consent cookie set should not see the cookie banner', () => {
    CookieBanner.setCookieConsent('true')
    CookieBanner.init()

    const $ = render('cookie-banner', examples.default)
    const mainContent = $('.dm-cookie-banner__wrapper')
    expect(mainContent.is('hidden')).toBe(true)
  })

  it('with consent cookie set to accept analytics should have analytics enabled', () => {
    CookieBanner.setCookieConsent('true')
    CookieBanner.init()
    expect(Analytics.init).toHaveBeenCalled()
  })

  it('with consent cookie set to reject analytics should not have analytics enabled', () => {
    CookieBanner.setCookieConsent('false')
    CookieBanner.init()
    expect(Analytics.init).not.toHaveBeenCalled()
  })
})

describe('cookie-banner accepting analytics', () => {
  beforeEach(() => {
    // TODO: use jest mock instead of spyOn
    // spyOn(Analytics, 'init').and.callThrough()
    CookieBanner.init()
    const $ = render('cookie-banner', examples.default)
    const acceptButton = $('.dm-cookie-banner__button-accept button')
    jquery(acceptButton).click()
  })

  it('new user accepting analytics should see confirmation', () => {
    const $ = render('cookie-banner', examples.default)
    const mainContent = $('.dm-cookie-banner__wrapper')
    expect(mainContent.is('hidden')).toBe(true)
    const confirmationBanner = $('.dm-cookie-confirmation')
    expect(confirmationBanner.is('hidden')).toBe(false)
  })

  it('new user accepting analytics should set consent cookie', () => {
    expect(CookieBanner.setCookieConsent).toHaveBeenCalled()
  })

  it('new user accepting analytics should have analytics enabled', () => {
    expect(Analytics.init).not.toHaveBeenCalled()
  })

  it('clicking Hide after accepting should hide the cookie banner', () => {
    const $ = render('cookie-banner', examples.default)
    const hideButton = $('.dm-cookie-banner__hide-button')
    const banner = $('.dm-cookie-banner')

    jquery(hideButton).click()

    expect(banner.is('hidden')).toBe(true)
  })
})

describe('cookie-banner rejecting analytics', () => {
  beforeEach(() => {
    // TODO: use jest mock instead of spyOn
    // spyOn(Analytics, 'init').and.callThrough()
    CookieBanner.init()
    const $ = render('cookie-banner', examples.default)
    const rejectButton = $('.dm-cookie-banner__button-reject button')

    jquery(rejectButton).click()
  })

  it('new user rejecting analytics should see confirmation', () => {
    const $ = render('cookie-banner', examples.default)
    const buttonBanner = $('.dm-cookie-banner__wrapper')
    const confirmationBanner = $('.dm-cookie-confirmation')
    expect(buttonBanner.is('hidden')).toBe(true)
    expect(confirmationBanner.is('hidden')).toBe(false)
  })

  it('new user rejecting analytics should set consent cookie', () => {
    expect(CookieBanner.setCookieConsent).toHaveBeenCalled()
  })

  it('new user rejecting analytics should not have analytics enabled', () => {
    expect(Analytics.init).not.toHaveBeenCalled()
  })

  it('clicking Hide after rejecting should hide the cookie banner', () => {
    const $ = render('cookie-banner', examples.default)
    const hideButton = $('.dm-cookie-banner__hide-button')
    const banner = $('.dm-cookie-banner')

    jquery(hideButton).click()

    expect(banner.is('hidden')).toBe(true)
  })
})
