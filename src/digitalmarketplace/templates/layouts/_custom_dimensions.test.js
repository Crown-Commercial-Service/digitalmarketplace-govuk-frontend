const nunjucks = require('nunjucks')

describe('Custom GA Dimensions', () => {
  beforeAll(() => {
    nunjucks.configure('src/digitalmarketplace/templates')
  })

  it('renders a meta tag for google to track users role', () => {
    const configObj = {
      current_user: {
        role: 'staff'
      }
    }
    const output = nunjucks.render('./layouts/_custom_dimensions.html', configObj)
    expect(output.trim()).toBe('<meta name="ga_customDimension" data-id="10" data-value="staff">')
  })

  it('renders a meta tag for google to track suppliers organisation size', () => {
    const configObj = {
      current_user: {
        supplier_organisation_size: '2019'
      }
    }
    const output = nunjucks.render('./layouts/_custom_dimensions.html', configObj)
    expect(output.trim()).toBe('<meta name="ga_customDimension" data-id="11" data-value="2019">')
  })

  describe('when an list of custom dimensions are passed in', () => {
    it('renders a single meta tag for google to track a single custom dimension', () => {
      const customDimensionsObject = {
        custom_dimensions: [
          {
            data_id: 1,
            data_value: 'screen-size'
          }
        ]
      }
      const output = nunjucks.render('./layouts/_custom_dimensions.html', customDimensionsObject)
      expect(output.trim()).toBe('<meta name="ga_customDimension" data-id="1" data-value="screen-size">')
    })

    it('renders multiple meta tag for google to track multiple custom dimension', () => {
      const customDimensionsObject = {
        custom_dimensions: [
          {
            data_id: 1,
            data_value: 'screen-size'
          },
          {
            data_id: 2,
            data_value: 'device'
          }
        ]
      }
      const output = nunjucks.render('./layouts/_custom_dimensions.html', customDimensionsObject)
      expect(output.trim().replace(/\n(.*\s)/g, ''))
        .toBe('<meta name="ga_customDimension" data-id="1" data-value="screen-size">  <meta name="ga_customDimension" data-id="2" data-value="device">')
    })
  })

  it('should not render anything if no options are set', () => {
    const output = nunjucks.render('./layouts/_custom_dimensions.html')
    expect(output.trim()).toBe('')
  })
})
