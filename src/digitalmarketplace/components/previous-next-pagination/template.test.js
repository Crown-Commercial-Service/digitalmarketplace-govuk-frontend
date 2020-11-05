/**
 * @jest-environment jsdom
 */

const axe = require('../../../../lib/axe-helper')

const { render, getExamples } = require('../../../../lib/jest-helpers.js')

const examples = getExamples('previous-next-pagination')

describe('Previous and Next Pagination', () => {
  describe('by default', () => {
    it('matches existing snapshot', () => {
      const $ = render('previous-next-pagination', examples.default)
      expect($.html()).toMatchSnapshot()
    })

    it('passes basic accessibility tests', async () => {
      const $ = render('previous-next-pagination', examples.default, false, false, true)
      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('renders previous and next url and title', async () => {
      const $ = render('previous-next-pagination', examples.default, false, false, true)
      const $previous = $($('.dm-pagination__link')[0])
      const $next = $($('.dm-pagination__link')[1])

      expect($('.dm-pagination__link-label').length).toBe(0)

      expect($previous.find('.dm-pagination__link-text').text().trim()).toEqual('Previous page')
      expect($next.find('.dm-pagination__link-text').text().trim()).toEqual('Next page')
      expect($previous.attr('href')).toEqual('#')
      expect($next.attr('href')).toEqual('#')
    })
  })

  describe('with labels', () => {
    it('matches existing snapshot', () => {
      const $ = render('previous-next-pagination', examples['with labels'])
      expect($.html()).toMatchSnapshot()
    })

    it('renders labels', async () => {
      const $ = render('previous-next-pagination', examples['with labels'], false, false, true)

      const $previous = $($('.dm-pagination__link-label')[0])
      const $next = $($('.dm-pagination__link-label')[1])
      expect($previous.text().trim()).toEqual('2 of 432')
      expect($next.text().trim()).toEqual('4 of 432')
    })
  })

  describe('with custom aria label', () => {
    it('matches existing snapshot', () => {
      const $ = render('previous-next-pagination', examples['with aria label'])
      expect($.html()).toMatchSnapshot()
    })

    it('renders custom aria label', async () => {
      const $ = render('previous-next-pagination', examples['with aria label'], false, false, true)

      expect($('.dm-pagination').attr('aria-label')).toEqual('Custom aria label')
    })
  })

  describe('with no params', () => {
    it('matches existing snapshot', () => {
      const $ = render('previous-next-pagination', examples['with no params'])
      expect($.html()).toMatchSnapshot()
    })

    it('is empty', () => {
      const $ = render('previous-next-pagination', examples['with no params'])
      expect($.html()).toEqual('<html><head></head><body></body></html>')
    })
  })
})
