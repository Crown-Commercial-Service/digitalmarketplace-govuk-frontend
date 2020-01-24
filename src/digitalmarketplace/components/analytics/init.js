import Analytics from './analytics'

window.DMGOVUKFrontend = window.DMGOVUKFrontend || {}

const trackingId = 'UA-26179049-1'

window[`ga-disable-${trackingId}`] = true

function initAnalytics () {
  // guard against being called more than once
  if (!('analytics' in window.DMGOVUKFrontend)) {
    window[`ga-disable-${trackingId}`] = false

    // TODO: Check if we still need this hack for the domain
    const cookieDomain = (document.domain === 'www.digitalmarketplace.service.gov.uk') ? '.digitalmarketplace.service.gov.uk' : document.domain

    // Load Analytics libraries
    Analytics.init()

    // Configure profiles and make interface public
    // for custom dimensions, virtual pageviews and events
    window.DMGOVUKFrontend.analytics = new Analytics({
      trackingId: trackingId,
      cookieDomain: cookieDomain,
      anonymizeIp: true,
      displayFeaturesTask: null,
      transport: 'beacon',
      name: 'DMGOVUKFrontend.analytics',
      expires: 365
    })

    // Track initial pageview
    window.DMGOVUKFrontend.analytics.trackPageview()
  }
}

export default initAnalytics
