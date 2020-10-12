/**
 * @jest-environment jsdom
 */

const axe = require('../../../../lib/axe-helper')

const { render, getExamples } = require('../../../../lib/jest-helpers.js')

const examples = getExamples('expander')

describe('Expander', () => {
  describe('by default', () => {
    it('matches existing snapshot', () => {
      const $ = render('expander', examples.default)
      expect($.html()).toMatchSnapshot()
    })

    it('passes basic accessibility tests', async () => {
      const $ = render('expander', examples.default, false, false, true)
      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('renders the title', async () => {
      const $ = render('expander', examples.default)
      const title = $('.dm-expander__title').text().trim()

      expect(title).toEqual('Default')
    })

    it('renders the content', async () => {
      const $ = render('expander', examples.default)
      const container = $('.dm-expander__content')

      expect(container.text().trim()).toEqual('Dummy content')
    })
  })

  describe('when open on load', () => {
    it('matches existing snapshot', () => {
      const $ = render('expander', examples.expanded)
      expect($.html()).toMatchSnapshot()
    })

    it('passes basic accessibility tests', async () => {
      const $ = render('expander', examples.expanded, false, false, true)
      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('sets open on load correctly', async () => {
      const $ = render('expander', examples.expanded, false, false, true)
      const container = $('.dm-expander[data-open-on-load="true"]')

      expect(container.length).toBe(1)
    })
  })

  describe('when open on load', () => {
    it('matches existing snapshot', () => {
      const $ = render('expander', examples.selected)
      expect($.html()).toMatchSnapshot()
    })

    it('passes basic accessibility tests', async () => {
      const $ = render('expander', examples.selected, false, false, true)
      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('displays selected message', async () => {
      const $ = render('expander', examples.selected)
      const selectedMessage = $('.dm-expander__selected-counter').text().trim()

      expect(selectedMessage).toBe('1 selected')
    })
  })
})
