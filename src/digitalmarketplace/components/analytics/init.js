import * as PageAnalytics from './analytics'

window.DMGOVUKFrontend = window.DMGOVUKFrontend || {}

// TODO: Remove hard coded tracking IDs to make this more generic and useful to others
const trackingId = 'UA-49258698-1'
const linkedTrackingId = 'UA-145652997-1'

window[`ga-disable-${trackingId}`] = true

function InitialiseAnalytics () {
  // guard against being called more than once
  if (!('analytics' in window.DMGOVUKFrontend)) {
    window[`ga-disable-${trackingId}`] = false

    // TODO: Check if we still need this hack for the domain
    const cookieDomain = (document.domain === 'www.digitalmarketplace.service.gov.uk') ? '.digitalmarketplace.service.gov.uk' : document.domain

    // Load Analytics libraries
    PageAnalytics.LoadGoogleAnalytics()

    // Configure profiles and make interface public
    // for custom dimensions, virtual pageviews and events
    window.DMGOVUKFrontend.analytics = new PageAnalytics.SetupAnalytics({
      trackingId: trackingId,
      cookieDomain: cookieDomain,
      anonymizeIp: true,
      displayFeaturesTask: null,
      transport: 'beacon',
      expires: 365
    })

    // Add cross-domain tracking for www.gov.uk domain
    PageAnalytics.AddLinkedTrackerDomain(linkedTrackingId, 'govuk_shared', ['www.gov.uk'])

    // Track initial pageview
    PageAnalytics.TrackPageview()
  }
}

export default InitialiseAnalytics
