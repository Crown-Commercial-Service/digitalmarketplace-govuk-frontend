const nunjucks = require('nunjucks')

describe('Site Verification', () => {
  beforeAll(() => {
    nunjucks.configure('src/digitalmarketplace/templates')
  })

  it('renders a meta tag for google if config option is set', () => {
    const configObj = {
      config: {
        GOOGLE_SITE_VERIFICATION: 'i-own-this'
      }
    }
    const output = nunjucks.render('./layouts/_site_verification.html', configObj)
    expect(output.trim()).toBe('<meta name="google-site-verification" content="i-own-this">')
  })

  it('should not render anything if the config option is not set', () => {
    const output = nunjucks.render('./layouts/_site_verification.html')
    expect(output.trim()).toBe('')
  })
})
