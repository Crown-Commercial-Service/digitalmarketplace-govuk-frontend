/**
 * @jest-environment jsdom
 */

const axe = require('../../../../lib/axe-helper')

const { render, getExamples } = require('../../../../lib/jest-helpers.js')

const examples = getExamples('keyword-search')

describe('Keyword search', () => {
  describe('by default', () => {
    it('matches existing snapshot', () => {
      const $ = render('keyword-search', examples.default)
      expect($.html()).toMatchSnapshot()
    })

    it('passes basic accessibility tests', async () => {
      const $ = render('keyword-search', examples.default, false, false, true)
      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('has a label', async () => {
      const $ = render('keyword-search', examples.default, false, false, true)
      const $label = $('label.dm-keyword-search__label').text().trim()
      expect($label).toBe(examples.default.inputLabel)
    })

    it('has the correct id', async () => {
      const $ = render('keyword-search', examples.default, false, false, true)
      const $el = $('#' + examples.default.id)
      expect($el).toBeTruthy()
    })

    it('has the correct input id', async () => {
      const $ = render('keyword-search', examples.default, false, false, true)
      const $el = $('#' + examples.default.inputId)
      expect($el).toBeTruthy()
    })
  })

  describe('with a value', () => {
    it('matches existing snapshot', () => {
      const $ = render('keyword-search', examples['with value'])
      expect($.html()).toMatchSnapshot()
    })

    it('passes basic accessibility tests', async () => {
      const $ = render('keyword-search', examples['with value'], false, false, true)
      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('has a value', async () => {
      const $ = render('keyword-search', examples.default, false, false, true)
      const $inputText = $('input.dm-keyword-search__input[value="' + examples['with value'].value + '"]')
      expect($inputText).toBeTruthy()
    })
  })
})
