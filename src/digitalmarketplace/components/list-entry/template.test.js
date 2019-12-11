/**
 * @jest-environment jsdom
 */

const axe = require('../../../../lib/axe-helper')

const { render, getExamples } = require('../../../../lib/jest-helpers.js')

const examples = getExamples('list-entry')

describe('List entry', () => {
  describe('Describe when no JavaScript', () => {
    it('default example passes accessibility tests', async () => {
      const $ = render('list-entry', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })
    describe('fieldset', () => {
      it('renders the component with a legend', () => {
        const $ = render('list-entry', examples.default)
        const legend = $('.dm-list-entry__legend').text().trim()
        expect(legend).toBe(examples.default.fieldset.legend.text)
      })
    })

    describe('hint text', () => {
      it('renders the component with hint text when it has been provided', () => {
        const $ = render('list-entry', examples.default)
        const hint = $('.govuk-hint').text().trim()
        expect(hint).toBe(examples.default.hint.text)
      })
    })

    describe('list of entries', () => {
      it('renders the component with the correct number of items it was given', () => {
        const $ = render('list-entry', examples.default)
        expect($('.govuk-input').length).toBe(examples.default.maxItems)
      })
    })
  })
})
