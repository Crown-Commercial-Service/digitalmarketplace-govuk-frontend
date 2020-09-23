const configPaths = require('../../../../config/paths.json')
const PORT = configPaths.ports.test

// URLs
const BASE_URL = 'http://localhost:' + PORT
const DEFAULT_EXAMPLE_URL = BASE_URL + '/components/option-select/preview'
const COLLAPSED_EXAMPLE_URL = BASE_URL + '/components/option-select/with-options-collapsed/preview'
const FEW_OPTIONS_EXAMPLE_URL = BASE_URL + '/components/option-select/with-few-options/preview'

describe('/components/option-select', () => {
  describe('/components/option-select/preview', () => {
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
        const arrowIcons = await page.$$('.dm-option-select__icon')
        await page.waitForSelector('.dm-option-select__icon', { visible: false })
        expect(arrowIcons.length).toBe(2)
      })

      it('displays all checkboxes', async () => {
        await page.waitForSelector('.govuk-checkboxes__item', { visible: true })
        const checkboxes = await page.$$('.govuk-checkboxes__item')
        expect(checkboxes.length).toBe(5)
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
        await page.waitForSelector('.dm-option-select__icon', { visible: true })
        const arrowIcons = await page.$$('.dm-option-select__icon')
        expect(arrowIcons.length).toBe(2)
      })

      it('can collapse and expand', async () => {
        await page.click('.dm-option-select__button')
        await page.waitForSelector('.govuk-checkboxes', { visible: false })
        expect(await page.$$('.dm-option-select__button[aria-expanded="false"]')).toBeTruthy()

        await page.click('.dm-option-select__button')
        await page.waitForSelector('.govuk-checkboxes', { visible: true })
        expect(await page.$('.dm-option-select__button[aria-expanded="true"]')).toBeTruthy()
      })

      it('increments and decrements checked counter when checkbox checked and unchecked', async () => {
        await page.click('.govuk-checkboxes__input#default-1')
        await page.click('.govuk-checkboxes__input#default-2')
        await page.click('.govuk-checkboxes__input#default-3')
        await page.click('.govuk-checkboxes__input#default-4')
        await page.click('.govuk-checkboxes__input#default-5')
        await page.waitForSelector('.dm-option-select__selected-counter', { visible: true })
        const counter = await page.$('.dm-option-select__selected-counter')
        const counterText = await page.evaluate(counter => counter.textContent, counter)
        expect(counterText).toEqual('5 selected')

        await page.click('.govuk-checkboxes__input#default-1')
        await page.click('.govuk-checkboxes__input#default-2')
        await page.click('.govuk-checkboxes__input#default-3')
        await page.click('.govuk-checkboxes__input#default-4')
        await page.click('.govuk-checkboxes__input#default-5')
        await expect(page).not.toMatchElement('.dm-option-select__selected-counter')
      })
    })
  })

  describe('/components/option-select/with-options-collapsed/preview', () => {
    beforeEach(async () => {
      await page.goto(COLLAPSED_EXAMPLE_URL, { waitUntil: 'load' })
    })

    it('can begin with the option select closed on load', async () => {
      const container = await page.$$('.dm-option-select[data-closed-on-load="true"]')
      expect(container.length).toBe(1)

      await page.waitForSelector('.govuk-checkboxes', { visible: false })
      expect(await page.$('.dm-option-select__button[aria-expanded="false"]')).toBeTruthy()
    })
  })

  describe('/components/option-select/with-few-options/preview', () => {
    beforeEach(async () => {
      await page.goto(FEW_OPTIONS_EXAMPLE_URL, { waitUntil: 'load' })
    })

    it('overrides default height if not many options', async () => {
      const containerHeight = await page.evaluate(() => {
        const container = document.querySelector('.dm-option-select__container')
        return parseInt((container.style.height).slice(0, -2))
      })
      expect(containerHeight).toBeLessThan(200)
    })
  })
})
