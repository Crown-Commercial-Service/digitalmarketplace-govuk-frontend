const { render, getExamples } = require('../../../../lib/jest-helpers.js')

const examples = getExamples('footer')

describe('footer', () => {
  it('renders a footer component with all our standard links', () => {
    const $ = render('footer', examples.default)
    expect($.html()).toMatchSnapshot()
  })
})
