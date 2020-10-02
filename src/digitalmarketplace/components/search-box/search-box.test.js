const configPaths = require('../../../../config/paths.json')
const PORT = configPaths.ports.test

// URLs
const BASE_URL = 'http://localhost:' + PORT
const DEFAULT_EXAMPLE_URL = BASE_URL + '/components/search-box/preview'
const VALUE_EXAMPLE_URL = BASE_URL + '/components/search-box/with-value/preview'

describe('/components/search-box', () => {
  describe('/components/search-box/preview', () => {
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
    })

    describe('when JavaScript is available', () => {
      beforeAll(async () => {
        await page.setJavaScriptEnabled(true)
      })

      beforeEach(async () => {
        await page.goto(DEFAULT_EXAMPLE_URL, { waitUntil: 'load' })
      })

      describe('when the search box is interacted with', () => {
        it('applies the focus style on focus and removes it on blur', async () => {
          let searchInput = await page.$('.js-class-toggle:not(focus)')
          expect(searchInput).toBeTruthy()
          await page.focus('.js-class-toggle')
          searchInput = await page.$('.js-class-toggle.focus')
          expect(searchInput).toBeTruthy()
          await page.$eval('.js-class-toggle', e => e.blur())
          searchInput = await page.$('.js-class-toggle:not(focus)')
          expect(searchInput).toBeTruthy()
        })
      })
    })
  })

  describe('/components/search-box/with-value/preview', () => {
    beforeEach(async () => {
      await page.goto(VALUE_EXAMPLE_URL, { waitUntil: 'load' })
    })

    describe('when the search box has a value', () => {
      it('applies focus style on load if search box already has a value', async () => {
        const searchInput = await page.$('.js-class-toggle.focus')
        expect(searchInput).toBeTruthy()
      })

      it('does not remove focus style on blur if search box already has a value', async () => {
        let searchInput = await page.$('.js-class-toggle')
        await page.focus('.js-class-toggle')
        searchInput = await page.$('.js-class-toggle.focus')
        expect(searchInput).toBeTruthy()
        await page.$eval('.js-class-toggle', e => e.blur())
        searchInput = await page.$('.js-class-toggle.focus')
        expect(searchInput).toBeTruthy()
      })
    })
  })
})
