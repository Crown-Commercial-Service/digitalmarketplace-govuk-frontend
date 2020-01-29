/**
 * @jest-environment jsdom
 */
import InitialiseAnalytics from './init'

beforeAll(() => {
  // add the script GA looks for in the document
  document.body.appendChild(document.createElement('script'))

  // Set up mocks
  window.ga = jest.fn()
  // jest.spyOn(window.DMGOVUKFrontend.analytics, 'init')

  // pretend we're on the /privacy-notice page
  jest.spyOn(window, 'location', 'get').mockImplementation(() => {
    return {
      pathname: '/privacy-notice',
      search: ''
    }
  })
})

afterEach(() => {
  window.DMGOVUKFrontend.analytics.mockClear()
  window.ga.mockClear()
})

describe('InitialiseAnalytics component', () => {
  it('Google Analytics is disabled by default', async () => {
    expect(window['ga-disable-UA-26179049-1']).toBe(true)
  })

  describe('If initAnalytics has already been called', () => {
    beforeAll(() => {
      // Fake a tracker instance
      window.DMGOVUKFrontend.analytics = {}
    })

    beforeEach(() => {
      InitialiseAnalytics()
    })

    afterAll(() => {
      delete window.DMGOVUKFrontend.analytics
    })

    it('the Google Analytics libraries will not be loaded', () => {
      expect(window.DMGOVUKFrontend.Analytics.init).not.toHaveBeenCalled()
    })
  })

  describe('If initAnalytics has not yet been called', () => {
    beforeEach(() => {
      InitialiseAnalytics()
    })

    afterEach(() => {
      // initAnalytics sets up a new window.DMGOVUKFrontend.analytics which needs clearing
      delete window.DMGOVUKFrontend.analytics
    })

    it('Google Analytics will not be disabled', () => {
      expect(window['ga-disable-UA-26179049-1']).toBe(false)
    })

    it('Analytics libraries will have been loaded to the DM namespace', () => {
      expect(window.DMGOVUKFrontend.Analytics.init).toHaveBeenCalled()
      expect(window.DMGOVUKFrontend.analytics).toBeDefined()
    })

    it('fires an initial trackPageview', () => {
      expect(window.ga.mock.calls.length).toEqual(5)
      // The first 4 calls configure the analytics tracker. All subsequent calls send data
      expect(window.ga.mock.calls[4]).toEqual(['send', 'pageview', '/privacy-policy'])
    })
  })
})
