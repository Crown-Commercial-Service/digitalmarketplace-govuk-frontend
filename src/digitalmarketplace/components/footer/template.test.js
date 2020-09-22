/**
 * @jest-environment jsdom
 */
const axe = require('../../../../lib/axe-helper')

const { render, getExamples } = require('../../../../lib/jest-helpers.js')

const examples = getExamples('footer')

const urlForMock = jest.fn((param) => {
  let value = ''
  if (param === 'external.help') {
    value = 'http://www.example.com/1'
  } else if (param === 'external.suppliers_list_by_prefix') {
    value = 'http://www.example.com/2'
  } else if (param === 'external.cookies') {
    value = 'http://www.example.com/3'
  } else if (param === 'external.privacy_notice') {
    value = 'http://www.example.com/4'
  } else if (param === 'external.terms_and_conditions') {
    value = 'http://www.example.com/5'
  } else if (param === 'external.accessibility_statement') {
    value = 'http://www.example.com/6'
  }

  return value
})

describe('footer', () => {
  it('default example passes accessibility tests', async () => {
    const $ = render('footer', examples.default, { url_for: urlForMock })

    const results = await axe($.html())
    expect(results).toHaveNoViolations()
  })

  it('renders a footer component with all our standard links', () => {
    const $ = render('footer', examples.default, { url_for: urlForMock })
    expect($.html()).toMatchSnapshot()
  })
})
