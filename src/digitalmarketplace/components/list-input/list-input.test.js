const configPaths = require('../../../../config/paths.json')
const PORT = configPaths.ports.test

const baseUrl = 'http://localhost:' + PORT

// const browser = puppeteer.launch();
// const page = browser.newPage();

describe('/components/list-input', () => {
  describe('/components/list-input/preview', () => {
    describe('when JavaScript is unavailable or fails', () => {
      beforeAll(async () => {
        await page.setJavaScriptEnabled(false)
      })

      afterAll(async () => {
        await page.setJavaScriptEnabled(true)
      })

      it('falls back to displaying all 15 item entries', async () => {
        await page.goto(baseUrl + '/components/list-input/preview', { waitUntil: 'load' })
        const numberOfEntries = (await page.$$('.dm-list-input__item')).length
        const numberOfVisibleEntries = (await page.$$('.dm-list-input__item:not(.dm-list-input__item--hidden')).length
        expect(numberOfVisibleEntries).toBe(numberOfEntries)
      })

      it('does not display any remove buttons', async () => {
        await page.goto(baseUrl + '/components/list-input/preview', { waitUntil: 'load' })
        const numberOfVisibleEntries = (await page.$$('.dm-list-input__item:not(.dm-list-input__item--hidden')).length
        const numberOfHiddenRemoveButtons = (await page.$$('.dm-list-input__item-remove.dm-list-input__item-remove--hidden')).length

        expect(numberOfHiddenRemoveButtons).toEqual(numberOfVisibleEntries)
      })

      it('does not display bottom "Add more" button ', async () => {
        await page.goto(baseUrl + '/components/list-input/preview', { waitUntil: 'load' })
        const isAddButtonHidden = (await page.$$('.dmp-list-input__item-add--hidden')).length > 0

        expect(isAddButtonHidden).toBeTruthy()
      })
    })

    describe('when JavaScript is available', () => {
      beforeAll(async () => {
        await page.setJavaScriptEnabled(true)
      })

      it('displays all previously recorded data and one extra blank row', async () => {
        await page.goto(baseUrl + '/components/list-input/preview', { waitUntil: 'load' })
        const numberOfVisibleEntries = (await page.$$('.dm-list-input__item:not(.dm-list-input__item--hidden')).length
        expect(numberOfVisibleEntries).toBe(5)
      })

      it('displays a remove option next to each visible entry if there is more than 1', async () => {
        await page.goto(baseUrl + '/components/list-input/preview', { waitUntil: 'load' })
        const numberOfVisibleEntries = (await page.$$('.dm-list-input__item:not(.dm-list-input__item--hidden')).length
        const numberOfVisibleRemoveButtons = (await page.$$('.dm-list-input__item-remove:not(.dm-list-input__item-remove--hidden)')).length

        expect(numberOfVisibleRemoveButtons).toEqual(numberOfVisibleEntries)
      })

      it('displays "Add more" button ', async () => {
        await page.goto(baseUrl + '/components/list-input/preview', { waitUntil: 'load' })
        const isAddButtonVisible = (await page.$$('.dmp-list-input__item-add--hidden')).length === 0

        expect(isAddButtonVisible).toBeTruthy()
      })

      describe('when a list input is removed', () => {
        const firstRow = '.dm-list-input .dm-list-input__item-container > .dm-list-input__item:nth-child(1)'
        beforeEach(async () => {
          await page.goto(baseUrl + '/components/list-input/preview', { waitUntil: 'load' })
        })
        it('"removes" the list input by hiding it', async () => {
          await page.click(firstRow + ' .govuk-button')

          await page.waitForSelector(firstRow, { visible: false })
          expect(await page.$(firstRow + '.dm-list-input__item--hidden')).toBeTruthy()
        })

        it('sets focus to the next visible list input, if the list item removed is not the last one', async () => {
          await page.click(firstRow + ' .govuk-button')
          await page.waitForSelector(firstRow, { visible: false })
          const focussedInputID = await page.evaluate(() => document.activeElement.getAttribute('id'))
          const secondRowInputID = 'my-list-1' /* zero based index i.e "1" is second item */

          expect(focussedInputID).toEqual(secondRowInputID)
        })

        it('sets focus to the previous visible list input, if the list item removed is the last one', async () => {
          const lastRow = '.dm-list-input .dm-list-input__item-container > .dm-list-input__item:nth-child(5)'
          await page.click(lastRow + ' .govuk-button')
          await page.waitForSelector(lastRow, { visible: false })
          const focussedInputID = await page.evaluate(() => document.activeElement.getAttribute('id'))
          const second2LastRowInputID = 'my-list-3' /* zero based index i.e "1" is second item */

          expect(focussedInputID).toEqual(second2LastRowInputID)
        })

        it('clears the list input input value', async () => {
          await page.click(firstRow + ' .govuk-button')
          await page.waitForSelector(firstRow, { visible: false })
          const removedListInputValue = await page.evaluate((firstRow) => document.querySelector(firstRow + ' input'))

          expect(removedListInputValue).toBeNull()
        })

        it('removes any error styling if the list input had a previous validation error', async () => {

        })
      })
    })
  })
})
