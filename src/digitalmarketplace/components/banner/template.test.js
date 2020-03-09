/**
 * @jest-environment jsdom
 */
const axe = require('../../../../lib/axe-helper')

const { render, getExamples } = require('../../../../lib/jest-helpers.js')

const examples = getExamples('banner')

describe('banner', () => {
  it('default example passes accessibility tests', async () => {
    const $ = render('banner', examples.default)
    const results = await axe($.html())
    expect(results).toHaveNoViolations()
  })

  it('renders a banner component with the title text', () => {
    const $ = render('banner', examples.default)
    expect($.html()).toMatchSnapshot()
  })

  it('renders an banner component with the optional headingLevel param of 1', () => {
    const $ = render('banner', examples['with optional headingLevel param'])
    expect($.html()).toMatchSnapshot()
  })

  it('renders title text with a different class when body is also present', () => {
    const $ = render('banner', {
      title: 'An action has been completed.',
      text: 'This text will be smaller than the title.'
    })
    const bannerTitle = $('h2')
    expect(bannerTitle.hasClass('dm-banner__title--large')).toBeTruthy()
  })

  it('renders body text and escapes HTML entities', () => {
    const $ = render('banner', {
      title: 'Does not matter for this test, but is required',
      text: 'An action has been <span style="color: red">completed</span> that lead to an error banner.'
    })
    const bannerBody = $('.dm-banner__body').html().trim()
    expect(bannerBody).toEqual('An action has been &lt;span style=&quot;color: red&quot;&gt;completed&lt;/span&gt; that lead to an error banner.')
  })

  it('renders title HTML and without escaping HTML entities', () => {
    const $ = render('banner', {
      title: 'Does not matter for this test, but is required',
      html: 'An action has been <span style="color: red">completed</span> that lead to an error banner.'
    })
    const bannerBody = $('.dm-banner__body').html().trim()
    expect(bannerBody).toEqual('An action has been <span style="color: red">completed</span> that lead to an error banner.')
  })

  it('extra classes are added to the containing div of the component', () => {
    const $ = render('banner', {
      classes: 'extra-class another-extra-class'
    })
    const $component = $('.dm-banner')
    expect($component.hasClass('extra-class another-extra-class')).toBeTruthy()
  })

  it('adds attributes to the containing div of to the component', () => {
    const $ = render('banner', {
      attributes: {
        'an-attribute': 0,
        'another-attribute': 1
      }
    })
    const $component = $('.dm-banner')
    expect($component.attr('an-attribute')).toEqual('0')
    expect($component.attr('another-attribute')).toEqual('1')
  })
})
