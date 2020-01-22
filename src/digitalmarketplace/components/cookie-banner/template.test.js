const axe = require('../../../../lib/axe-helper')

const { render, getExamples } = require('../../../../lib/jest-helpers.js')

const examples = getExamples('cookie-banner')

describe('cookie-banner', () => {
  it('default example passes accessibility tests', async () => {
    const $ = render('cookie-banner', examples.default)
    const results = await axe($.html())
    expect(results).toHaveNoViolations()
  })

  it('renders a cookie banner component with content and buttons', () => {
    const $ = render('cookie-banner', examples.default)
    expect($.html()).toMatchSnapshot()
  })

  it('renders a cookie banner component with a custom component ID', () => {
    const $ = render('cookie-banner', examples['with custom componentID'])
    const $component = $('.dm-cookie-banner')
    expect($component.attr('id')).toEqual('my-custom-component-id')
  })

  it('renders a cookie banner component with a custom service name', () => {
    const $ = render('cookie-banner', examples['with custom service name'])
    const cookieInfoLink = $('.dm-cookie-banner__link').html().trim()
    expect(cookieInfoLink).toEqual('How Digital Marketplace Admin uses cookies')
  })
})
