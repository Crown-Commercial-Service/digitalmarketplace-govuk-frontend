/**
 * @jest-environment jsdom
 */
import * as Analytics from './analytics'

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
})
