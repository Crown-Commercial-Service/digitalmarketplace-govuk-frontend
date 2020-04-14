/**
 * @jest-environment jsdom
 */
import InitialiseAnalytics from './init'
import * as PageAnalytics from './analytics'

jest.mock('./analytics')

beforeAll(() => {
  // add the script GA looks for in the document
  document.body.appendChild(document.createElement('script'))

  // pretend we're on the /privacy-notice page
  jest.spyOn(window, 'location', 'get').mockImplementation(() => {
    return {
      pathname: '/privacy-notice',
      search: ''
    }
  })
})

describe('InitialiseAnalytics component', () => {
  it('Google Analytics is disabled by default', async () => {
    expect(window['ga-disable-UA-49258698-1']).toBe(true)
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

    it('the Google Analytics libraries will not have been loaded', () => {
      expect(PageAnalytics.LoadGoogleAnalytics).not.toHaveBeenCalled()
    })

    it('the Analytics tracker will not have been configured', () => {
      expect(PageAnalytics.SetupAnalytics).not.toHaveBeenCalled()
    })

    it('the linked tracker domain will not have been fired', () => {
      expect(PageAnalytics.AddLinkedTrackerDomain).not.toHaveBeenCalled()
    })

    it('the initial trackPageview will not have been fired', () => {
      expect(PageAnalytics.TrackPageview).not.toHaveBeenCalled()
    })
  })

  describe('If initAnalytics has not yet been called', () => {
    beforeEach(() => {
      // Clear any analytics from previous tests
      delete window.DMGOVUKFrontend.analytics
      InitialiseAnalytics()
    })

    it('Google Analytics will not be disabled', () => {
      expect(window['ga-disable-UA-49258698-1']).toBe(false)
    })

    it('the Google Analytics libraries will have been loaded', () => {
      expect(PageAnalytics.LoadGoogleAnalytics).toHaveBeenCalled()
    })

    it('the Analytics tracker will have been configured', () => {
      expect(window.DMGOVUKFrontend.analytics).toBeDefined()

      expect(PageAnalytics.SetupAnalytics).toHaveBeenCalledWith(
        expect.objectContaining({
          // Do not assert cookieDomain or trackingId for now
          anonymizeIp: true,
          displayFeaturesTask: null,
          transport: 'beacon',
          expires: 365
        })
      )
    })

    it('adds the linked tracker domain', () => {
      expect(PageAnalytics.AddLinkedTrackerDomain).toHaveBeenCalled()
    })

    it('fires an initial trackPageview', () => {
      expect(PageAnalytics.TrackPageview).toHaveBeenCalled()
    })
  })
})
