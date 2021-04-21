/**
 * @jest-environment jsdom
 */
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

  it('renders title text and escapes HTML entities', () => {
    const $ = render('alert', {
      titleText: 'An action has been <span style="color: red">completed</span> that lead to an error alert.'
    })
    const alertTitle = $('.dm-alert__title').html().trim()
    expect(alertTitle).toEqual('An action has been &lt;span style="color: red"&gt;completed&lt;/span&gt; that lead to an error alert.')
  })

  it('renders title HTML and without escaping HTML entities', () => {
    const $ = render('alert', {
      titleHtml: 'An action has been <span style="color: red">completed</span> that lead to an error alert.'
    })
    const alertTitle = $('.dm-alert__title').html().trim()
    expect(alertTitle).toEqual('An action has been <span style="color: red">completed</span> that lead to an error alert.')
  })

  it('renders title text with a different class when body is also present', () => {
    const $ = render('alert', {
      titleText: 'An action has been completed.',
      text: 'This text will be smaller than the title.'
    })
    const alertTitle = $('h2')
    expect(alertTitle.hasClass('dm-alert__title--large')).toBeTruthy()
  })

  it('renders body text and escapes HTML entities', () => {
    const $ = render('alert', {
      titleText: 'Does not matter for this test, but is required',
      text: 'An action has been <span style="color: red">completed</span> that lead to an error alert.'
    })
    const alertBody = $('.dm-alert__body').html().trim()
    expect(alertBody).toEqual('An action has been &lt;span style="color: red"&gt;completed&lt;/span&gt; that lead to an error alert.')
  })

  it('renders title HTML and without escaping HTML entities', () => {
    const $ = render('alert', {
      titleText: 'Does not matter for this test, but is required',
      html: 'An action has been <span style="color: red">completed</span> that lead to an error alert.'
    })
    const alertBody = $('.dm-alert__body').html().trim()
    expect(alertBody).toEqual('An action has been <span style="color: red">completed</span> that lead to an error alert.')
  })

  it('extra classes are added to the containing div of the component', () => {
    const $ = render('alert', {
      classes: 'extra-class another-extra-class'
    })
    const $component = $('.dm-alert')
    expect($component.hasClass('extra-class another-extra-class')).toBeTruthy()
  })

  it('adds attributes to the containing div of to the component', () => {
    const $ = render('alert', {
      attributes: {
        'an-attribute': 0,
        'another-attribute': 1
      }
    })
    const $component = $('.dm-alert')
    expect($component.attr('an-attribute')).toEqual('0')
    expect($component.attr('another-attribute')).toEqual('1')
  })
})
