const configPaths = require('../../../../config/paths.json')
const PORT = configPaths.ports.test

// URLs
const BASE_URL = 'http://localhost:' + PORT
const DEFAULT_EXAMPLE_URL = BASE_URL + '/components/expander/preview'
const EXPANDED_EXAMPLE_URL = BASE_URL + '/components/expander/expanded/preview'

const waitForVisibleSelector = async (selector) => {
  return page.waitForSelector(selector, {
    visible: true,
    timeout: 1000
  })
}

describe('/components/expander', () => {
  describe('/components/expander/preview', () => {
    describe('when JavaScript is unavailable or fails', () => {
      beforeAll(async () => {
        await page.setJavaScriptEnabled(false)
      })

      afterAll(async () => {
        await page.setJavaScriptEnabled(true)
      })

      beforeEach(async () => {
        await page.goto(DEFAULT_EXAMPLE_URL, { waitUntil: 'load' })
      })

      it('does not display SVG up/down arrows', async () => {
        const arrowIcons = await page.$$('.dm-expander__icon')
        await page.waitForSelector('.dm-expander__icon', { visible: false })
        expect(arrowIcons.length).toBe(2)
      })
    })

    describe('when JavaScript is available', () => {
      beforeAll(async () => {
        await page.setJavaScriptEnabled(true)
      })

      beforeEach(async () => {
        await page.goto(DEFAULT_EXAMPLE_URL, { waitUntil: 'load' })
      })

      it('displays SVG up/down arrows', async () => {
        const collapsedDownArrow = await page.$('.dm-expander__icon--down')
        const collapsedUpArrow = await page.$('.dm-expander__icon--up', { visible: false })
        expect(collapsedDownArrow).toBeTruthy()
        expect(collapsedUpArrow).toBeTruthy()
        await page.click('.dm-expander__button')
        const expandedDownArrow = await page.$('.dm-expander__icon--down', { visible: false })
        const expandedUpArrow = await page.$('.dm-expander__icon--up')
        expect(expandedDownArrow).toBeTruthy()
        expect(expandedUpArrow).toBeTruthy()
      })

      it('can collapse and expand', async () => {
        expect(await page.$$('.dm-expander__button[aria-expanded="false"]')).toBeTruthy()

        await page.click('.dm-expander__button')
        expect(await page.$('.dm-expander__button[aria-expanded="true"]')).toBeTruthy()
      })
    })
  })

  describe('/components/expander/expanded/preview', () => {
    beforeEach(async () => {
      await page.goto(EXPANDED_EXAMPLE_URL, { waitUntil: 'load' })
    })

    it('can begin with the expander expanded on load', async () => {
      const container = await page.$$('.dm-expander[data-open-on-load="true"]')
      expect(container.length).toBe(1)

      const isContentVisible = await waitForVisibleSelector('.dm-expander__button[aria-expanded="true"]')

      expect(isContentVisible).toBeTruthy()
    })
  })
})
