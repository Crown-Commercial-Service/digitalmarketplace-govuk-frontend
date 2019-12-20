const configPaths = require('../../../../config/paths.json')
const PORT = configPaths.ports.test

const baseUrl = 'http://localhost:' + PORT

// const browser = puppeteer.launch();
// const page = browser.newPage();

describe('/components/list-entry', () => {
  describe('/components/list-entry/preview', () => {
    describe('when JavaScript is unavailable or fails', () => {
      beforeAll(async () => {
        await page.setJavaScriptEnabled(false)
      })

      afterAll(async () => {
        await page.setJavaScriptEnabled(true)
      })

      it('falls back to displaying all 15 item entries', async () => {
        await page.goto(baseUrl + '/components/list-entry/preview', { waitUntil: 'load' })
        const numberOfEntries = (await page.$$('.dm-list-entry__item')).length
        const numberOfVisibleEntries = (await page.$$('.dm-list-entry__item:not(.dm-list-entry__item--hidden')).length
        expect(numberOfVisibleEntries).toBe(numberOfEntries)
      })

      it('does not display any remove buttons', async () => {
        await page.goto(baseUrl + '/components/list-entry/preview', { waitUntil: 'load' })
        const numberOfVisibleEntries = (await page.$$('.dm-list-entry__item:not(.dm-list-entry__item--hidden')).length
        const numberOfHiddenRemoveButtons = (await page.$$('.dm-list-entry__item-remove.dm-list-entry__item-remove--hidden')).length

        expect(numberOfHiddenRemoveButtons).toEqual(numberOfVisibleEntries)
      })

      it('does not display bottom "Add more" button ', async () => {
        await page.goto(baseUrl + '/components/list-entry/preview', { waitUntil: 'load' })
        const isAddButtonHidden = (await page.$$('.dmp-list-entry__item-add--hidden')).length > 0

        expect(isAddButtonHidden).toBeTruthy()
      })
    })

    describe('when JavaScript is available', () => {
      beforeAll(async () => {
        await page.setJavaScriptEnabled(true)
      })

      it('displays all previously recorded data and one extra blank row', async () => {
        await page.goto(baseUrl + '/components/list-entry/preview', { waitUntil: 'load' })
        const numberOfVisibleEntries = (await page.$$('.dm-list-entry__item:not(.dm-list-entry__item--hidden')).length
        expect(numberOfVisibleEntries).toBe(5)
      })

      it('displays a remove option next to each visible entry if there is more than 1', async () => {
        await page.goto(baseUrl + '/components/list-entry/preview', { waitUntil: 'load' })
        const numberOfVisibleEntries = (await page.$$('.dm-list-entry__item:not(.dm-list-entry__item--hidden')).length
        const numberOfVisibleRemoveButtons = (await page.$$('.dm-list-entry__item-remove:not(.dm-list-entry__item-remove--hidden)')).length

        expect(numberOfVisibleRemoveButtons).toEqual(numberOfVisibleEntries)
      })

      it('displays "Add more" button ', async () => {
        await page.goto(baseUrl + '/components/list-entry/preview', { waitUntil: 'load' })
        const isAddButtonVisible = (await page.$$('.dmp-list-entry__item-add--hidden')).length === 0

        expect(isAddButtonVisible).toBeTruthy()
      })

      describe('when a list entry is removed', () => {
        const firstRow = '.dm-list-entry .dm-list-entry__item-container > .dm-list-entry__item:nth-child(1)'
        beforeEach(async () => {
          await page.goto(baseUrl + '/components/list-entry/preview', { waitUntil: 'load' })
        })
        it('"removes" the list entry by hiding it', async () => {
          await page.click(firstRow + ' .govuk-button')

          await page.waitForSelector(firstRow, { visible: false })
          expect(await page.$(firstRow + '.dm-list-entry__item--hidden')).toBeTruthy()
        })

        it('sets focus to the next visible list entry, if the list item removed is not the last one', async () => {
          await page.click(firstRow + ' .govuk-button')
          await page.waitForSelector(firstRow, { visible: false })
          const focussedInputID = await page.evaluate(() => document.activeElement.getAttribute('id'))
          const secondRowInputID = 'my-list-1' /* zero based index i.e "1" is second item */

          expect(focussedInputID).toEqual(secondRowInputID)
        })

        it('sets focus to the previous visible list entry, if the list item removed is the last one', async () => {
          const lastRow = '.dm-list-entry .dm-list-entry__item-container > .dm-list-entry__item:nth-child(5)'
          await page.click(lastRow + ' .govuk-button')
          await page.waitForSelector(lastRow, { visible: false })
          const focussedInputID = await page.evaluate(() => document.activeElement.getAttribute('id'))
          const second2LastRowInputID = 'my-list-3' /* zero based index i.e "1" is second item */

          expect(focussedInputID).toEqual(second2LastRowInputID)
        })

        it('clears the list entry input value', async () => {
          await page.click(firstRow + ' .govuk-button')
          await page.waitForSelector(firstRow, { visible: false })
          const removedListEntryValue = await page.evaluate((firstRow) => document.querySelector(firstRow + ' input'))

          expect(removedListEntryValue).toBeNull()
        })

        it('removes any error styling if the list entry had a previous validation error', async () => {

        })
      })
    })
  })
})
