const configPaths = require('../../../../config/paths.json')
const PORT = configPaths.ports.test

// URLs
const BASE_URL = 'http://localhost:' + PORT
const DEFAULT_EXAMPLE_URL = BASE_URL + '/components/list-input/preview'
const EXISTING_VALUES_EXAMPLE_URL = BASE_URL + '/components/list-input/with-existing-values/preview'
const ERRORS_EXAMPLE_URL = BASE_URL + '/components/list-input/with-error-for-specific-fields/preview'

// SELECTORS
const ROW_SELECTOR = '.dm-list-input .dm-list-input__item-container > .dm-list-input__item'
const ERROR_ROW_SELECTOR = '.dm-list-input .dm-list-input__item-container .dm-list-input__item--error'
const VISIBLE_INPUT_SELECTOR = '.dm-list-input__item:not(.dm-list-input__item--hidden)'
const HIDDEN_INPUT_SELECTOR = '.dm-list-input__item.dm-list-input__item--hidden'
const REMOVE_BUTTON_SELECTOR = '.dm-list-input__item-remove:not(.dm-list-input__item-remove--hidden)'
const HIDDEN_REMOVE_BUTTON_SELECTOR = '.dm-list-input__item-remove.dm-list-input__item-remove--hidden'
const ADD_BUTTON_SELECTOR = '.dm-list-input__item-add:not(.dm-list-input__item-add--hidden)'

describe('/components/list-input', () => {
  describe('/components/list-input/preview', () => {
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

      it('falls back to displaying every input', async () => {
        const numberOfVisibleInputs = (await page.$$(VISIBLE_INPUT_SELECTOR)).length

        expect(numberOfVisibleInputs).toBe(10)
      })

      it('does not display any remove buttons', async () => {
        const numberOfHiddenRemoveButtons = (await page.$$(HIDDEN_REMOVE_BUTTON_SELECTOR)).length

        expect(numberOfHiddenRemoveButtons).toEqual(10)
      })

      it('does not display "Add more" button', async () => {
        const isAddButtonHidden = (await page.$$(ADD_BUTTON_SELECTOR)).length === 0

        expect(isAddButtonHidden).toBeTruthy()
      })
    })

    describe('when JavaScript is available', () => {
      beforeAll(async () => {
        await page.setJavaScriptEnabled(true)
      })

      beforeEach(async () => {
        await page.goto(DEFAULT_EXAMPLE_URL, { waitUntil: 'load' })
      })

      it('displays two blank rows', async () => {
        const numberOfVisibleInputs = (await page.$$(VISIBLE_INPUT_SELECTOR)).length

        expect(numberOfVisibleInputs).toBe(2)
      })

      it('displays a remove option next to each visible input if there are more than 1', async () => {
        const numberOfVisibleRemoveButtons = (await page.$$(REMOVE_BUTTON_SELECTOR)).length

        expect(numberOfVisibleRemoveButtons).toBe(2)
      })

      it('displays "Add more" button', async () => {
        const isAddButtonVisible = (await page.$$(ADD_BUTTON_SELECTOR)).length > 0

        expect(isAddButtonVisible).toBeTruthy()
      })

      it('disables hidden inputs', async () => {
        const numberOfDisabledInputs = (await page.$$(HIDDEN_INPUT_SELECTOR + ' input[disabled]')).length

        expect(numberOfDisabledInputs).toBe(8)
      })

      describe('when an input is removed', () => {
        const firstRow = ROW_SELECTOR + ':nth-child(1)'

        it('"removes" the input by hiding it', async () => {
          await page.click(firstRow + ' .govuk-button')

          await page.waitForSelector(firstRow, { visible: false })
          expect(await page.$(firstRow + '.dm-list-input__item--hidden')).toBeTruthy()
        })

        it('disables the input', async () => {
          await page.click(firstRow + ' .govuk-button')

          await page.waitForSelector(firstRow, { visible: false })
          expect(await page.$(firstRow + ' input[disabled]')).toBeTruthy()
        })

        it('sets focus to the next visible input, if the list item removed is not the last one', async () => {
          await page.click(firstRow + ' .govuk-button')
          await page.waitForSelector(firstRow, { visible: false })
          const focussedInputID = await page.evaluate(() => document.activeElement.getAttribute('id'))
          const secondRowInputID = 'my-list-2' /* zero based index i.e "1" is second item */

          expect(focussedInputID).toEqual(secondRowInputID)
        })

        it('sets focus to the previous visible input, if the list item removed is the last one', async () => {
          const lastRow = ROW_SELECTOR + ':nth-child(2)'
          await page.click(lastRow + ' .govuk-button')
          await page.waitForSelector(lastRow, { visible: false })
          const focussedInputID = await page.evaluate(() => document.activeElement.getAttribute('id'))
          const firstRowInputID = 'my-list-1'

          expect(focussedInputID).toEqual(firstRowInputID)
        })

        it('reveals the add more button if it was previously hidden due to reaching the maximum item number', async () => {
          await page.waitForSelector(ADD_BUTTON_SELECTOR, { visible: true })
          for (let i = 0; i < 8; i++) {
            await page.click(ADD_BUTTON_SELECTOR)
          }
          const numberOfVisibleInputs = (await page.$$(VISIBLE_INPUT_SELECTOR)).length
          expect(numberOfVisibleInputs).toBe(10)

          const isAddButtonHidden = (await page.$$(ADD_BUTTON_SELECTOR)).length === 0
          expect(isAddButtonHidden).toBeTruthy()

          await page.click(firstRow + ' .govuk-button')
          await page.waitForSelector(firstRow, { visible: false })

          const isAddButtonVisible = (await page.$$(ADD_BUTTON_SELECTOR)).length > 0
          expect(isAddButtonVisible).toBeTruthy()
        })

        it('hides the add more button when there are no more remaining available items', async () => {
          for (let i = 0; i < 8; i++) {
            await page.click(ADD_BUTTON_SELECTOR)
          }

          const numberOfVisibleInputs = (await page.$$(VISIBLE_INPUT_SELECTOR)).length

          expect(numberOfVisibleInputs).toBe(10)

          const isAddButtonHidden = (await page.$$(ADD_BUTTON_SELECTOR)).length === 0
          expect(isAddButtonHidden).toBeTruthy()
        })

        it('hides the remove button on the first input if the visible inputs have been reduced to one', async () => {
          let numberOfVisibleRemoveButtons = (await page.$$(REMOVE_BUTTON_SELECTOR)).length
          expect(numberOfVisibleRemoveButtons).toEqual(2)
          await page.click(ROW_SELECTOR + ':nth-child(2) .govuk-button')
          const numberOfVisibleInputs = (await page.$$(VISIBLE_INPUT_SELECTOR)).length
          expect(numberOfVisibleInputs).toEqual(1)

          numberOfVisibleRemoveButtons = (await page.$$(REMOVE_BUTTON_SELECTOR)).length
          expect(numberOfVisibleRemoveButtons).toEqual(0)
        })
      })

      describe('when the "add more" button is clicked', () => {
        beforeEach(async () => {
          await page.waitForSelector(ADD_BUTTON_SELECTOR, { visible: true })
          await page.click(ADD_BUTTON_SELECTOR)
        })

        it('makes another input visible', async () => {
          const numberOfVisibleInputs = (await page.$$(VISIBLE_INPUT_SELECTOR)).length

          expect(numberOfVisibleInputs).toBe(3)
        })

        it('enables the newly visible input', async () => {
          await page.waitForSelector(ROW_SELECTOR + ':nth-child(3)', { visible: false })
          const numberOfDisabledVisibleInputs = (await page.$$(VISIBLE_INPUT_SELECTOR + ' input[disabled]')).length
          expect(numberOfDisabledVisibleInputs).toBe(0)
        })

        it('decrements "remaining" available items number', async () => {
          const numberOfHiddenInputs = (await page.$$(HIDDEN_INPUT_SELECTOR)).length
          const addButton = await page.$(ADD_BUTTON_SELECTOR)
          const addButtonContent = await page.evaluate(addButton => addButton.textContent, addButton)

          expect(addButtonContent).toEqual(expect.stringContaining(numberOfHiddenInputs + ' remaining'))
        })
      })
    })
  })

  describe('/components/list-input/with-existing-values/preview', () => {
    beforeEach(async () => {
      await page.goto(EXISTING_VALUES_EXAMPLE_URL, { waitUntil: 'load' })
    })

    it('displays all previously recorded data and one extra blank row', async () => {
      const numberOfVisibleInputs = (await page.$$(VISIBLE_INPUT_SELECTOR)).length

      expect(numberOfVisibleInputs).toBe(3)

      const numberOfFilledInputs = (await page.$$(VISIBLE_INPUT_SELECTOR + ' input[value]:not([value=""])')).length

      expect(numberOfFilledInputs).toBe(2)

      const numberOfEmptyInputs = (await page.$$(VISIBLE_INPUT_SELECTOR + ' input:not([value])')).length

      expect(numberOfEmptyInputs).toBe(1)
    })

    describe('when a filled input is removed', () => {
      const firstRow = ROW_SELECTOR + ':nth-child(1)'

      it('clears the input value', async () => {
        await page.click(firstRow + ' .govuk-button')
        await page.waitForSelector(firstRow, { visible: false })

        const numberOfFilledVisibleInputs = (await page.$$(VISIBLE_INPUT_SELECTOR + ' input[value]:not([value=""])')).length

        expect(numberOfFilledVisibleInputs).toBe(1)

        const numberOfEmptyVisibleInputs = (await page.$$(VISIBLE_INPUT_SELECTOR + ' input:not([value])')).length

        expect(numberOfEmptyVisibleInputs).toBe(1)

        const numberOfFilledHiddenInputs = (await page.$$(HIDDEN_INPUT_SELECTOR + ' input[value]:not([value=""])')).length

        expect(numberOfFilledHiddenInputs).toBe(0)
      })
    })
  })

  describe('/components/list-input/with-error-for-specific-fields/preview', () => {
    beforeEach(async () => {
      await page.goto(ERRORS_EXAMPLE_URL, { waitUntil: 'load' })
    })

    describe('when a input with error message is removed', () => {
      it('removes any error styling if the list input had a previous validation error', async () => {
        await page.click(ERROR_ROW_SELECTOR + ':nth-child(2) .govuk-button')
        await page.waitForSelector(ADD_BUTTON_SELECTOR, { visible: true })

        const numberOfVisibleInputs = (await page.$$(VISIBLE_INPUT_SELECTOR)).length

        expect(numberOfVisibleInputs).toBe(2)

        const numberOfHiddenInputs = (await page.$$(HIDDEN_INPUT_SELECTOR)).length

        expect(numberOfHiddenInputs).toBe(1)

        const numberOfErrorRows = (await page.$$(ERROR_ROW_SELECTOR)).length

        expect(numberOfErrorRows).toBe(1)
      })

      it('removes the error message id from the input aria-describedby attribute', async () => {
        const errorInputSelector = ERROR_ROW_SELECTOR + ':nth-child(2) input.govuk-input--error'
        const errorId = await page.$eval(errorInputSelector, el => el.getAttribute('id'))
        const errorDescribedBy = await page.$eval(errorInputSelector, el => el.getAttribute('aria-describedby'))

        expect(errorDescribedBy).toEqual(expect.stringContaining(errorId))

        await page.click(ERROR_ROW_SELECTOR + ':nth-child(2) .govuk-button')
        await page.waitForSelector(ADD_BUTTON_SELECTOR, { visible: true })

        const hiddenInputsDescribedByErrors = (await page.$$(HIDDEN_INPUT_SELECTOR + ` input[aria-describedby*="${errorId}-error"]`)).length

        expect(hiddenInputsDescribedByErrors).toBe(0)
      })
    })
  })
})
