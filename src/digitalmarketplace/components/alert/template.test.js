const axe = require('../../../../lib/axe-helper')

const { render, getExamples } = require('../../../../lib/jest-helpers.js')

const examples = getExamples('alert')

describe('alert', () => {
  it('default example passes accessibility tests', async () => {
    const $ = render('alert', examples.default)
    const results = await axe($.html())
    expect(results).toHaveNoViolations()
  })

  it('renders an alert component with the title text', () => {
    const $ = render('alert', examples.default)
    expect($.html()).toMatchSnapshot()
  })

  it('renders an alert component with the optional headingLevel param of 1', () => {
    const $ = render('alert', examples['with optional headingLevel param'])
    expect($.html()).toMatchSnapshot()
  })

  it('renders an alert component with error message', () => {
    const $ = render('alert', examples['with an error message'])
    expect($.html()).toMatchSnapshot()
  })
})
