/**
 * @jest-environment jsdom
 */

const axe = require('../../../../lib/axe-helper')

const { render, getExamples } = require('../../../../lib/jest-helpers.js')

const examples = getExamples('list-input')

describe('List Input', () => {
  describe('by default', () => {
    it('matches existing snapshot', () => {
      const $ = render('list-input', examples.default)
      expect($.html()).toMatchSnapshot()
    })

    it('passes basic accessibility tests', async () => {
      const $ = render('list-input', examples.default, false, false, true)
      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    describe('fieldset', () => {
      it('renders the component with a legend', () => {
        const $ = render('list-input', examples.default)
        const $legend = $('.dm-list-input__legend').text().trim()
        expect($legend).toBe(examples.default.fieldset.legend.text)
      })
    })

    describe('list of inputs', () => {
      it('renders the correct number of inputs', () => {
        const $ = render('list-input', examples.default)
        expect($('.govuk-input').length).toBe(examples.default.maxItems)
      })

      it('renders the inputs with id and name', () => {
        const $ = render('list-input', examples.default)
        const $component = $('.dm-list-input')

        const $inputs = $component.find(`input[name="${examples.default.name}"]`)
        expect($inputs.length).toEqual(examples.default.maxItems)

        expect($inputs[0].attribs.id).toEqual(examples.default.id)

        for (let i = 2; i <= examples.default.maxItems; i++) {
          expect($inputs[i - 1].attribs.id).toEqual(examples.default.id + '-' + i)
        }
      })

      it('numbers each input', () => {
        const $ = render('list-input', examples.default)
        const $component = $('.dm-list-input')

        const $numberedLabels = $component.find('label span[class="dm-list-input__counter"]')
        expect($numberedLabels.length).toEqual(examples.default.maxItems)

        for (let i = 0; i < examples.default.maxItems; i++) {
          expect($($numberedLabels[i]).text()).toEqual(String(i + 1))
        }
      })

      it('renders a hidden remove button for each item', () => {
        const $ = render('list-input', examples.default)
        const $buttons = $('.dm-list-input__item-remove--hidden')
        expect($buttons.length).toBe(examples.default.maxItems)
      })
    })

    describe('"add another" button', () => {
      it('renders a hidden add button with the correct string', () => {
        const $ = render('list-input', examples.default)
        expect($('.dm-list-input__item-add--hidden').text()).toContain(examples.default.addButtonName)
      })
    })
  })

  describe('with existing values', () => {
    it('matches existing snapshot', () => {
      const $ = render('list-input', examples['with existing values'])
      expect($.html()).toMatchSnapshot()
    })
    it('renders the correct values for inputs', () => {
      const $ = render('list-input', examples['with existing values'])
      const items = $('.govuk-input')
      examples['with existing values'].items.forEach((item, index) => {
        expect(items[index].attribs.value).toBe(item.value)
      })
    })
  })

  describe('with hint', () => {
    it('matches existing snapshot', () => {
      const $ = render('list-input', examples['with hint'])
      expect($.html()).toMatchSnapshot()
    })

    it('renders with hint text', () => {
      const $ = render('list-input', examples['with hint'])
      const hint = $('.govuk-hint').text().trim()
      expect(hint).toBe(examples['with hint'].hint.text)
    })
  })

  describe('when it is optional', () => {
    it('matches existing snapshot', () => {
      const $ = render('list-input', examples['is optional'])
      expect($.html()).toMatchSnapshot()
    })
    it('renders the component with "(Optional)" text', () => {
      const $ = render('list-input', examples['is optional'])
      const legend = $('.dm-list-input__legend').text().trim()
      expect(legend).toBe(examples['is optional'].fieldset.legend.text + ' (Optional)')
    })
  })

  describe('with errors', () => {
    describe('with component-level error', () => {
      it('matches existing snapshot', () => {
        const $ = render('list-input', examples['with error'])
        expect($.html()).toMatchSnapshot()
      })

      it('passes basic accessibility tests', async () => {
        const $ = render('list-input', examples['with error'], false, false, true)
        const results = await axe($.html())
        expect(results).toHaveNoViolations()
      })

      it('renders with an error message', () => {
        const $ = render('list-input', examples['with error'])
        const error = $('.dm-list-input .govuk-error-message').text().trim()
        expect(error).toBe('Error: ' + examples['with error'].errorMessage.text)
      })
    })

    describe('with input-level errors', () => {
      it('matches existing snapshot', () => {
        const $ = render('list-input', examples['with error for specific fields'])
        expect($.html()).toMatchSnapshot()
      })

      it('renders inputs with errors if they have them', () => {
        const errorExample = examples['with error for specific fields']
        const exampleErrors = errorExample.items.filter(
          item => Object.prototype.hasOwnProperty.call(item, 'errorMessage')
        )

        const $ = render('list-input', errorExample)
        const $errorMessages = $('.dm-list-input-error-message.govuk-error-message')

        expect($errorMessages.length).toBe(exampleErrors.length)
        exampleErrors.forEach(item => {
          const hasErrorRendered = $(`.dm-list-input-error-message.govuk-error-message:contains(${item.errorMessage.text})`).length === 1
          expect(hasErrorRendered).toBeTruthy()
        })
      })
    })
  })
})
