/**
 * @jest-environment jsdom
 */

const axe = require('../../../../lib/axe-helper')

const { render, getExamples } = require('../../../../lib/jest-helpers.js')

const examples = getExamples('option-select')

describe('Option Select', () => {
  describe('by default', () => {
    it('matches existing snapshot', () => {
      const $ = render('option-select', examples.default)
      expect($.html()).toMatchSnapshot()
    })

    it('passes basic accessibility tests', async () => {
      const $ = render('option-select', examples.default, false, false, true)
      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('renders a heading for the option select box containing the title', async () => {
      const $ = render('option-select', examples.default)
      const title = $('.dm-option-select__title').text().trim()

      expect(title).toEqual('Default')
    })

    it('renders a container with the ID passed in', async () => {
      const $ = render('option-select', examples.default)
      const container = $('#default-options.dm-option-select__container')

      expect(container.length).toBe(1)
    })

    it('renders a set of checkboxes', async () => {
      const $ = render('option-select', examples.default)
      const govukCheckboxes = $('.govuk-checkboxes')

      expect(govukCheckboxes.length).toBe(1)

      const checkboxes = $('.govuk-checkboxes__item')

      expect(checkboxes.length).toBe(5)
    })
  })

  describe('when collapsed on load', () => {
    it('matches existing snapshot', () => {
      const $ = render('option-select', examples['with options collapsed'])
      expect($.html()).toMatchSnapshot()
    })

    it('passes basic accessibility tests', async () => {
      const $ = render('option-select', examples['with options collapsed'], false, false, true)
      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })
  })

  describe('when few options', () => {
    it('matches existing snapshot', () => {
      const $ = render('option-select', examples['with few options'])
      expect($.html()).toMatchSnapshot()
    })

    it('passes basic accessibility tests', async () => {
      const $ = render('option-select', examples['with few options'], false, false, true)
      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })
  })

  describe('with option pre-checked', () => {
    it('matches existing snapshot', () => {
      const $ = render('option-select', examples['with option pre checked'])
      expect($.html()).toMatchSnapshot()
    })

    it('passes basic accessibility tests', async () => {
      const $ = render('option-select', examples['with option pre checked'], false, false, true)
      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('renders a checked checkbox', async () => {
      const $ = render('option-select', examples['with option pre checked'])
      const selectedCheckbox = $('#with_checked_value_set')

      expect(selectedCheckbox.length).toBe(1)
      expect(selectedCheckbox.attr('checked')).toBeTruthy()
    })
  })
})
