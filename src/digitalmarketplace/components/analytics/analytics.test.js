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

  describe('sends data to Google Analytics when', () => {
    beforeAll(() => {
      jest.spyOn(window, 'location', 'get').mockImplementation(() => {
        return {
          pathname: '/privacy-policy',
          search: '',
          href: '/privacy-policy'
        }
      })
    })

    it('trackPageView sends pageview event', () => {
      window.ga.mockClear()

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

      Analytics.AddLinkedTrackerDomain('UA-54321', 'myDomain', ['www.example.com'])

      // Assert tracker setup calls
      expect(window.ga.mock.calls[0]).toEqual(['create', 'UA-54321', 'auto', { name: 'myDomain' }])
      expect(window.ga.mock.calls[1]).toEqual(['require', 'linker'])
      expect(window.ga.mock.calls[2]).toEqual(['myDomain.require', 'linker'])
      expect(window.ga.mock.calls[3]).toEqual(['linker:autoLink', ['www.example.com']])
      expect(window.ga.mock.calls[4]).toEqual(['myDomain.linker:autoLink', ['www.example.com']])
      expect(window.ga.mock.calls[5]).toEqual(['myDomain.set', 'anonymizeIp', true])
      expect(window.ga.mock.calls[6]).toEqual(['myDomain.set', 'location', '/privacy-policy'])
      expect(window.ga.mock.calls[7]).toEqual(['myDomain.send', 'pageview'])
    })
  })

  describe('sanitises personal data when', () => {
    beforeAll(() => {
      jest.spyOn(window, 'location', 'get').mockImplementation(() => {
        return {
          pathname: '/search',
          search: '?q=email@example.com',
          href: '/search?q=email@example.com'
        }
      })
    })

    it('trackPageView sends a pageview event', () => {
      window.ga.mockClear()

      Analytics.TrackPageview()

      expect(window.ga.mock.calls[0]).toEqual(['send', 'pageview', '/search?q=[email]'])
    })

    it('trackEvent sends an event', () => {
      window.ga.mockClear()

      Analytics.TrackEvent('myCategory', 'myAction', { label: 'email@example.com' })

      expect(window.ga.mock.calls[0]).toEqual([
        'send',
        'event',
        {
          eventAction: 'myAction',
          eventCategory: 'myCategory',
          eventLabel: '[email]'
        }
      ])
    })

    it('AddLinkedTrackerDomain initialises tracker', () => {
      window.ga.mockClear()

      Analytics.AddLinkedTrackerDomain('UA-54321', 'myDomain', ['www.example.com'])

      // Assert location has been stripped of PII when setting up tracker
      expect(window.ga.mock.calls[6]).toEqual(['myDomain.set', 'location', '/search?q=[email]'])
    })
  })

  describe('sanitises personal data when the URL is contains two query strings', () => {
    beforeEach(() => {
      jest.spyOn(window, 'location', 'get').mockImplementation(() => {
        return {
          pathname: '/user/login',
          search: '?next=/admin/users?email_address=email@example.com',
          href: '/user/login?next=/admin/users?email_address=email@example.com'
        }
      })
    })

    it('AddLinkedTrackerDomain removes the PII', () => {
      window.ga.mockClear()

      Analytics.AddLinkedTrackerDomain('UA-54321', 'myDomain', ['www.example.com'])

      expect(window.ga.mock.calls[6]).toEqual(['myDomain.set', 'location', '/user/login?next=/admin/users?email_address=[email]'])
    })
  })

  describe('sanitises personal data when the URL is containspartial email address', () => {
    beforeEach(() => {
      jest.spyOn(window, 'location', 'get').mockImplementation(() => {
        return {
          pathname: '/search',
          search: '?q=@example.com',
          href: '/search?q=@example.com'
        }
      })
    })

    it('AddLinkedTrackerDomain removes the PII', () => {
      window.ga.mockClear()

      Analytics.AddLinkedTrackerDomain('UA-54321', 'myDomain', ['www.example.com'])

      // Assert location has been stripped of PII when setting up tracker
      expect(window.ga.mock.calls[6]).toEqual(['myDomain.set', 'location', '/search?q=[email]'])
    })
  })
})
