const axe = require('../../../../lib/axe-helper')

const { render, getExamples } = require('../../../../lib/jest-helpers.js')

const examples = getExamples('footer')

describe('footer', () => {
  it('default example passes accessibility tests', async () => {
    const $ = render('footer', examples.default)

    const results = await axe($.html())
    expect(results).toHaveNoViolations()
  })

  it('renders a footer component with all our standard links', () => {
    const $ = render('footer', examples.default)
    expect($.html()).toMatchSnapshot()
  })
})
