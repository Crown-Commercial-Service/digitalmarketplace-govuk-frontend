/**
 * @jest-environment jsdom
 */

const axe = require('../../../../lib/axe-helper')

const { render, getExamples } = require('../../../../lib/jest-helpers.js')

const examples = getExamples('search-box')

describe('Search box', () => {
  describe('by default', () => {
    it('matches existing snapshot', () => {
      const $ = render('search-box', examples.default)
      expect($.html()).toMatchSnapshot()
    })

    it('passes basic accessibility tests', async () => {
      const $ = render('search-box', examples.default, false, false, true)
      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('has a label', async () => {
      const $ = render('search-box', examples.default, false, false, true)
      const $label = $('label.dm-search-box__label').text().trim()
      expect($label).toBe(examples.default.inputLabel)
    })

    it('has the correct id', async () => {
      const $ = render('search-box', examples.default, false, false, true)
      const $el = $('#' + examples.default.id)
      expect($el).toBeTruthy()
    })

    it('has the correct input id', async () => {
      const $ = render('search-box', examples.default, false, false, true)
      const $el = $('#' + examples.default.inputId)
      expect($el).toBeTruthy()
    })
  })

  describe('with a value', () => {
    it('matches existing snapshot', () => {
      const $ = render('search-box', examples['with value'])
      expect($.html()).toMatchSnapshot()
    })

    it('passes basic accessibility tests', async () => {
      const $ = render('search-box', examples['with value'], false, false, true)
      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('has a value', async () => {
      const $ = render('search-box', examples.default, false, false, true)
      const $inputText = $('input.dm-search-box__input[value="' + examples['with value'].value + '"]')
      expect($inputText).toBeTruthy()
    })
  })
})
