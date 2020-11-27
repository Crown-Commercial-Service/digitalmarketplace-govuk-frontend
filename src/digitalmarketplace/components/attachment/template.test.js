/**
 * @jest-environment jsdom
 */

const axe = require('../../../../lib/axe-helper')

const { render, getExamples } = require('../../../../lib/jest-helpers.js')

const examples = getExamples('attachment')

describe('Attachment', () => {
  describe('by default', () => {
    it('matches existing snapshot', () => {
      const $ = render('attachment', examples.default)
      expect($.html()).toMatchSnapshot()
    })

    it('passes basic accessibility tests', async () => {
      const $ = render('attachment', examples.default, false, false, true)
      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('renders a thumbnail', async () => {
      const $ = render('attachment', examples.default)
      const thumbnail = $('.dm-attachment__thumbnail--doc')

      expect(thumbnail.length).toBe(1)
    })

    it('renders a download link with correct text and url', async () => {
      const $ = render('attachment', examples.default)
      const link = $('.dm-attachment__link')

      expect(link.text().trim()).toEqual('Default attachment')
      expect(link.attr('href')).toEqual('https://digitalmarketplace.service.gov.uk/attachment')
    })

    it('does not render metadata', async () => {
      const $ = render('attachment', examples.default)
      const metadata = $('.dm-attachment__metadata')

      expect(metadata.length).toBe(0)
    })
  })

  describe('if spreadsheet', () => {
    it('matches existing snapshot', () => {
      const $ = render('attachment', examples.spreadsheet)
      expect($.html()).toMatchSnapshot()
    })

    it('renders the correct thumbnail', async () => {
      const $ = render('attachment', examples.spreadsheet)
      const thumbnail = $('.dm-attachment__thumbnail--csv')

      expect(thumbnail.length).toBe(1)
    })

    it('renders the correct filetype and abbreviation', async () => {
      const $ = render('attachment', examples.spreadsheet)
      const filetype = $('.dm-attachment__attribute')
      const abbr = $('.dm-attachment__abbr')

      expect(filetype.text().trim()).toEqual('CSV')
      expect(abbr.attr('title')).toEqual('Comma-separated Values')
    })
  })

  describe('if pdf', () => {
    it('matches existing snapshot', () => {
      const $ = render('attachment', examples.pdf)
      expect($.html()).toMatchSnapshot()
    })

    it('renders the correct thumbnail', async () => {
      const $ = render('attachment', examples.pdf)
      const thumbnail = $('.dm-attachment__thumbnail--pdf')

      expect(thumbnail.length).toBe(1)
    })

    it('renders the correct filetype', async () => {
      const $ = render('attachment', examples.pdf)
      const filetype = $('.dm-attachment__attribute')
      const abbr = $('.dm-attachment__abbr')

      expect(filetype.text().trim()).toEqual('PDF')
      expect(abbr.attr('title')).toEqual('Portable Document Format')
    })
  })

  describe('if unknown filetype', () => {
    it('matches existing snapshot', () => {
      const $ = render('attachment', examples['unknown filetype'])
      expect($.html()).toMatchSnapshot()
    })

    it('renders a generic thumbnail', async () => {
      const $ = render('attachment', examples['unknown filetype'])
      const thumbnail = $('.dm-attachment__thumbnail--doc')

      expect(thumbnail.length).toBe(1)
    })

    it('renders the raw filetype', async () => {
      const $ = render('attachment', examples['unknown filetype'])
      const filetype = $('.dm-attachment__attribute')

      expect(filetype.text().trim()).toEqual('txt')
    })
  })

  describe('with file size', () => {
    it('matches existing snapshot', () => {
      const $ = render('attachment', examples['with file size'])
      expect($.html()).toMatchSnapshot()
    })

    it('renders the file size', async () => {
      const $ = render('attachment', examples['with file size'])
      const attributes = $('.dm-attachment__attribute')
      expect(attributes.length).toBe(2)
      expect($(attributes[1]).text().trim()).toEqual('21.5 KB')
    })
  })

  describe('with page count', () => {
    it('matches existing snapshot', () => {
      const $ = render('attachment', examples['with page count'])
      expect($.html()).toMatchSnapshot()
    })

    it('renders the page count', async () => {
      const $ = render('attachment', examples['with page count'])
      const attributes = $('.dm-attachment__attribute')
      expect(attributes.length).toBe(2)
      expect($(attributes[1]).text().trim()).toEqual('12 pages')
    })
  })

  describe('with alternative format contact email', () => {
    it('matches existing snapshot', () => {
      const $ = render('attachment', examples['with alternative format contact email'])
      expect($.html()).toMatchSnapshot()
    })

    it('renders a details component', async () => {
      const $ = render('attachment', examples['with alternative format contact email'])
      const details = $('.govuk-details')
      expect(details.length).toBe(1)

      const summary = $('.govuk-details__summary')
      expect(summary.text().trim()).toEqual('Request an accessible format')

      const detailText = $('.govuk-details__text')
      expect(detailText.text()).toContain(examples['with alternative format contact email'].alternativeFormatContactEmail)
    })
  })

  describe('with alternative format HTML', () => {
    it('matches existing snapshot', () => {
      const $ = render('option-select', examples['with alternative format HTML'])
      expect($.html()).toMatchSnapshot()
    })

    it('renders a details component', async () => {
      const $ = render('attachment', examples['with alternative format HTML'])
      const details = $('.govuk-details')
      expect(details.length).toBe(1)

      const summary = $('.govuk-details__summary')
      expect(summary.text().trim()).toEqual('Request an accessible format')

      const detailText = $('.govuk-details__text')
      expect(detailText.html().trim()).toEqual(examples['with alternative format HTML'].alternativeFormatHtml)
    })
  })

  describe('as text only', () => {
    it('matches existing snapshot', () => {
      const $ = render('attachment', examples['as only text'])
      expect($.html()).toMatchSnapshot()
    })

    it('does not render thumbnail', async () => {
      const $ = render('attachment', examples['as only text'])
      const thumbnail = $('.dm-attachment__thumbnail')

      expect(thumbnail.length).toBe(0)
    })

    it('renders class attribute', async () => {
      const $ = render('attachment', examples['as only text'])
      const link = $('.' + examples['as only text'].link.classes)

      expect(link.length).toBe(1)
    })

    it('parenthesizes attributes', async () => {
      const $ = render('attachment', examples['as only text'])
      const linkText = $('.dm-attachment-link').text().trim()

      expect(linkText).toContain('Attachment with no thumbnail')
      expect(linkText).toContain('(PDF, 21.5 KB)')
    })
  })

  describe('with description', () => {
    it('matches existing snapshot', () => {
      const $ = render('attachment', examples['with description'])
      expect($.html()).toMatchSnapshot()
    })

    it('renders a description', async () => {
      const $ = render('attachment', examples['with description'])
      const description = $('.govuk-hint')

      expect(description.text().trim()).toEqual('This is the agreement you signed.')
    })
  })

  describe('with custom heading level', () => {
    it('matches existing snapshot', () => {
      const $ = render('attachment', examples['with custom heading level'])
      expect($.html()).toMatchSnapshot()
    })

    it('renders a description', async () => {
      const $ = render('attachment', examples['with custom heading level'])
      const heading = $('h3')

      expect(heading.text().trim()).toEqual('Attachment with custom heading level')
    })
  })
})
