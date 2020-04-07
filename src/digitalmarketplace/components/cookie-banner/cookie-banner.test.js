const cheerio = require('cheerio')
const configPaths = require('../../../../config/paths.json')
const PORT = configPaths.ports.test

const baseUrl = 'http://localhost:' + PORT

const goToAndGetComponent = async (name, options) => {
  let component
  if (options && options.example) {
    component = `${name}/${options.example}`
  } else {
    component = `${name}`
  }
  const componentPath = `${baseUrl}/components/${component}/preview`
  await page.goto(componentPath, { waitUntil: 'load' })
  const html = await page.evaluate(() => document.body.innerHTML)
  const $ = cheerio.load(html)
  return $
}

const waitForVisibleSelector = async (selector) => {
  return page.waitForSelector(selector, {
    visible: true,
    timeout: 1000
  })
}

describe('cookie-banner new user', () => {
  it('who has not consented should see the cookie banner', async () => {
    await goToAndGetComponent('cookie-banner')
    const isContentVisible = await waitForVisibleSelector('.dm-cookie-banner')
    expect(isContentVisible).toBeTruthy()
  })

  it('who has not consented should not have analytics running', async () => {
    await goToAndGetComponent('cookie-banner')

    const didAnalyticsRun = await page.evaluate(() => window.GoogleAnalyticsObject)
    expect(didAnalyticsRun).toBeUndefined()
  })
})

describe('cookie-banner returning user', () => {
  it('with consent cookie set should not see the cookie banner', async () => {
    const cookie = { name: 'dm_cookies_policy', value: '{"analytics": true }' }

    await goToAndGetComponent('cookie-banner', { cookie })
    await page.setCookie(cookie) // set cookies to browser to pretend that user has agreed
    await page.reload() // reload the page
    const isBannerHidden = await page.waitForSelector('.dm-cookie-banner', { visible: false })

    expect(isBannerHidden).toBeTruthy()
  })

  it('with consent cookie set to accept analytics should have analytics enabled', async () => {
    const cookie = { name: 'dm_cookies_policy', value: '{"analytics": true }' }
    await goToAndGetComponent('cookie-banner')
    await page.setCookie(cookie) // set cookies to browser to pretend that user has agreed
    await page.reload() // reload the page

    const didAnalyticsRun = await page.evaluate(() => window.GoogleAnalyticsObject) === 'ga'

    expect(didAnalyticsRun).toBeDefined()
  })

  it('with consent cookie set to reject analytics should not have analytics enabled', async () => {
    const cookie = { name: 'dm_cookies_policy', value: '{"analytics": false }' }
    await goToAndGetComponent('cookie-banner')
    await page.setCookie(cookie) // set cookies to browser to pretend that user has agreed
    await page.reload() // reload the page

    const didAnalyticsRun = await page.evaluate(() => window.GoogleAnalyticsObject)
    expect(didAnalyticsRun).toBeUndefined()
  })
})

describe('cookie-banner new user', () => {
  describe('cookie-banner accepting analytics', () => {
    beforeEach(async () => {
      await page.deleteCookie({ name: 'dm_cookies_policy' })
      await page.deleteCookie({ name: '_gid' })
      await page.deleteCookie({ name: '_ga' })
      await page.deleteCookie({ name: '_gat_govuk_shared' })

      await goToAndGetComponent('cookie-banner')
      await page.click('.dm-cookie-banner__button--accept')
    })

    it('should see confirmation', async () => {
      const isConfirmationVisible = await waitForVisibleSelector('.dm-cookie-banner__confirmation')
      expect(isConfirmationVisible).toBeTruthy()
    })

    it('should set consent cookie', async () => {
      const cookies = await page.cookies()
      expect(cookies).toEqual(expect.arrayContaining([expect.objectContaining({ name: 'dm_cookies_policy' })]))
      expect(cookies).toEqual(expect.arrayContaining([expect.objectContaining({ value: '{"analytics":true}' })]))
    })

    // Flaky test - only 3 out of 4 cookies are set reliability before the assertion
    it('should have analytics cookies set', async () => {
      const cookies = await page.cookies()
      // Make sure we wait until the page has loaded the Analytics code
      await page.evaluate(() => window.GoogleAnalyticsObject)
      expect(cookies).toEqual(expect.arrayContaining([expect.objectContaining({ name: '_gid' })]))
      expect(cookies).toEqual(expect.arrayContaining([expect.objectContaining({ name: '_ga' })]))
      expect(cookies).toEqual(expect.arrayContaining([expect.objectContaining({ name: '_gat_govuk_shared' })]))
      expect(cookies.length).toEqual(4) // 3 GA cookies plus consent cookie
    })

    it('should have analytics enabled', async () => {
      const didAnalyticsRun = await page.evaluate(() => window.GoogleAnalyticsObject)
      expect(didAnalyticsRun).toBeDefined()
    })

    it('clicking Hide after accepting should hide the cookie banner', async () => {
      await page.click('.dm-cookie-banner__hide-button')

      const isBannerHidden = await page.waitForSelector('.dm-cookie-banner', { visible: false })
      expect(isBannerHidden).toBeTruthy()
    })
  })

  describe('cookie-banner rejecting analytics', () => {
    beforeEach(async () => {
      await page.deleteCookie({ name: 'dm_cookies_policy' })
      await page.deleteCookie({ name: '_gid' })
      await page.deleteCookie({ name: '_ga' })
      await page.deleteCookie({ name: '_gat_govuk_shared' })

      await goToAndGetComponent('cookie-banner')
      await page.click('.dm-cookie-banner__button--reject')
    })

    it('should see confirmation', async () => {
      const isConfirmationVisible = await waitForVisibleSelector('.dm-cookie-banner__confirmation')
      expect(isConfirmationVisible).toBeTruthy()
    })

    it('should set consent cookie', async () => {
      const cookies = await page.cookies()
      expect(cookies[0].name).toEqual('dm_cookies_policy')
      expect(cookies[0].value).toEqual('{"analytics":false}')
    })

    it('should not set analytics cookies', async () => {
      const cookies = await page.cookies()
      expect(cookies.length).toEqual(1) // consent cookie only
    })

    it('should not have analytics enabled', async () => {
      const didAnalyticsRun = await page.evaluate(() => window.GoogleAnalyticsObject)
      expect(didAnalyticsRun).toBeUndefined()
    })

    it('clicking Hide after rejecting should hide the cookie banner', async () => {
      await page.click('.dm-cookie-banner__hide-button')

      const isBannerHidden = await page.waitForSelector('.dm-cookie-banner', { visible: false })
      expect(isBannerHidden).toBeTruthy()
    })
  })
})
