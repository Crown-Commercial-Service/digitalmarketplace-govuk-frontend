/**
 * @jest-environment jsdom
 */
import * as Analytics from './analytics'
import stripPII from './pii'

jest.mock('./pii')

const defaultConfig = {
  trackingId: 'UA-12345',
  cookieDomain: 'www.digitalmarketplace.service.gov.uk',
  anonymizeIp: true,
  displayFeaturesTask: null,
  transport: 'beacon',
  expires: 365
}

beforeAll(() => {
  // add the script GA looks for in the document
  document.body.appendChild(document.createElement('script'))
})

beforeEach(() => {
  // Set up mock
  window.ga = jest.fn()

  Analytics.SetupAnalytics(defaultConfig)
})

afterEach(() => {
  window.ga.mockClear()
})

describe('analytics component', () => {
  it('init creates script element', async () => {
    expect(window.ga.mock.calls).toEqual([
      ['create', 'UA-12345', 'www.digitalmarketplace.service.gov.uk', { cookieExpires: 31536000 }],
      ['set', 'anonymizeIp', true],
      ['set', 'displayFeaturesTask', null],
      ['set', 'transport', 'beacon']
    ])
  })

  it('setup google analytics', () => {
    expect(window.GoogleAnalyticsObject).not.toBeDefined()
    Analytics.LoadGoogleAnalytics()
    expect(window.GoogleAnalyticsObject).toEqual('ga')
  })

  it('trackPageView sends pageview event', () => {
    window.ga.mockClear()

    jest.spyOn(window, 'location', 'get').mockImplementation(() => {
      return {
        pathname: '/privacy-policy',
        search: ''
      }
    })

    Analytics.TrackPageview()

    expect(window.ga.mock.calls[0]).toEqual(['send', 'pageview', '/privacy-policy'])
  })

  it('trackEvent sends generic event', () => {
    window.ga.mockClear()

    Analytics.TrackEvent('myCategory', 'myAction', { label: 'myLabel' })

    expect(window.ga.mock.calls[0]).toEqual([
      'send',
      'event',
      {
        eventAction: 'myAction',
        eventCategory: 'myCategory',
        eventLabel: 'myLabel'
      }
    ])
  })

  it('AddLinkedTrackerDomain initialises tracker', () => {
    window.ga.mockClear()

    stripPII.mockImplementation(() => {
      // We'd expect the helper to return a sanitised url
      return '/search?q=[email]'
    })

    Analytics.AddLinkedTrackerDomain('UA-54321', 'myDomain', ['www.example.com'])

    // Assert tracker setup calls
    expect(window.ga.mock.calls[0]).toEqual(['create', 'UA-54321', 'auto', { name: 'myDomain' }])
    expect(window.ga.mock.calls[1]).toEqual(['require', 'linker'])
    expect(window.ga.mock.calls[2]).toEqual(['myDomain.require', 'linker'])
    expect(window.ga.mock.calls[3]).toEqual(['linker:autoLink', ['www.example.com']])
    expect(window.ga.mock.calls[4]).toEqual(['myDomain.linker:autoLink', ['www.example.com']])
    expect(window.ga.mock.calls[5]).toEqual(['myDomain.set', 'anonymizeIp', true])
    expect(window.ga.mock.calls[6]).toEqual(['myDomain.set', 'location', '/search?q=[email]'])
    expect(window.ga.mock.calls[7]).toEqual(['myDomain.send', 'pageview'])

    expect(stripPII).toHaveBeenCalled()
  })
})
