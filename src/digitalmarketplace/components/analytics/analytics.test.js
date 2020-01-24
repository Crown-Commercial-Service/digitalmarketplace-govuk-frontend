/**
 * @jest-environment jsdom
 */
import Analytics from './analytics'

const defaultConfig = {
  trackingId: 'UA-12345',
  cookieDomain: 'www.digitalmarketplace.service.gov.uk',
  anonymizeIp: true,
  displayFeaturesTask: null,
  transport: 'beacon',
  name: 'DMGOVUKFrontend',
  expires: 365
}

beforeAll(() => {
  // add the script GA looks for in the document
  document.body.appendChild(document.createElement('script'))
})

let analytics

beforeEach(() => {
  // Set up mock
  window.ga = jest.fn()

  analytics = new Analytics(defaultConfig)
})

afterEach(() => {
  window.ga.mockClear()
})

describe('analytics component', () => {
  it('init creates script element', async () => {
    expect(window.ga.mock.calls).toEqual(
      ['create', 'UA-12345', 'www.digitalmarketplace.service.gov.uk', 'DMGOVUKFrontend', { cookieExpires: 31536000 }],
      ['set', 'anonymizeIp', true],
      ['set', 'displayFeaturesTask', null],
      ['set', 'transport', 'beacon']
    )
  })

  it('trackPageView sends pageview event', () => {
    window.ga.mockClear()

    jest.spyOn(window, 'location', 'get').mockImplementation(() => {
      return {
        pathname: '/privacy-policy',
        search: ''
      }
    })

    analytics.trackPageView()

    expect(window.ga.mock.calls[0]).toEqual('send', 'pageview', '/privacy-policy')
  })

  it('trackEvent sends generic event', () => {
    window.ga.mockClear()

    analytics.trackEvent('myCategory', 'myAction', { label: 'myLabel' })

    expect(window.ga.mock.calls[0]).toEqual('send', 'event', { eventLabel: 'myLabel' })
  })
})
