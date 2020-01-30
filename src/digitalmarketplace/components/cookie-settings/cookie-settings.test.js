/**
 * @jest-environment jsdom
 */
import * as CookieHelpers from '../../helpers/cookie/cookie-functions'
import InitialiseAnalytics from '../analytics/init'
import CookieSettings from './cookie-settings'

jest.mock('../../helpers/cookie/cookie-functions')
jest.mock('../analytics/init')

const formInputsForMock = jest.fn((param) => {
  // Return the form input objects
  let inputs = []
  if (param === 'On') {
    inputs = [{ checked: true, value: 'On' }, { value: 'Off' }]
  } else if (param === 'Off') {
    inputs = [{ checked: true, value: 'Off' }, { value: 'On' }]
  } else if (param === 'Neither') {
    inputs = [{ value: 'On' }, { value: 'Off' }]
  }
  return inputs
})

const mockSubmitEvent = jest.fn((param) => {
  const submitEvent = jest.fn()
  submitEvent.target = jest.fn()
  submitEvent.preventDefault = jest.fn()
  submitEvent.target.querySelectorAll = jest.fn()
  submitEvent.target.querySelectorAll.mockImplementation(() => {
    return formInputsForMock(param)
  })
  return submitEvent
})

let cookieSettingsForm

beforeEach(() => {
  // Delete any existing cookies
  CookieHelpers.setCookie('dm_cookies_policy', null)

  cookieSettingsForm = document.createElement('form')
  cookieSettingsForm.setAttribute('id', 'dm-cookie-settings')
  const inputOn = '<input type="radio" name="cookies-analytics" value=On />'
  const inputOff = '<input type="radio" name="cookies-analytics" value=Off />'
  const submitButton = '<button type="submit">Save cookie settings</button>'
  const formInnerHTML = inputOn + inputOff + submitButton
  cookieSettingsForm.innerHTML = formInnerHTML
})

afterEach(() => {
  CookieHelpers.setConsentCookie.mockClear()
  CookieHelpers.getCookie.mockClear()
  InitialiseAnalytics.mockClear()
})

describe('Cookie settings', () => {
  describe('initialising the component', () => {
    it('hides the cookie banner if present', async () => {
      const $cookieSettings = await new CookieSettings(cookieSettingsForm)
      $cookieSettings.hideCookieBanner = jest.fn()

      await $cookieSettings.init()

      expect($cookieSettings.hideCookieBanner).toHaveBeenCalled()
    })

    it('initialises form values', async () => {
      const $cookieSettings = await new CookieSettings(cookieSettingsForm)
      $cookieSettings.setInitialFormValues = jest.fn()

      await $cookieSettings.init()

      expect($cookieSettings.setInitialFormValues).toHaveBeenCalled()
    })

    describe('without existing analytics', () => {
      it('does not hide the warning message', async () => {
        const $cookieSettings = await new CookieSettings(cookieSettingsForm)
        $cookieSettings.hideWarningMessage = jest.fn()

        await $cookieSettings.init()

        expect($cookieSettings.hideWarningMessage).not.toHaveBeenCalled()
      })
    })

    describe('with existing analytics', () => {
      beforeEach(async () => {
        CookieHelpers.getCookie.mockImplementation(() => {
          return { dm_cookies_policy: { analytics: true } }
        })
      })

      it('hides the warning message', async () => {
        const $cookieSettings = await new CookieSettings(cookieSettingsForm)
        $cookieSettings.hideWarningMessage = jest.fn()

        await $cookieSettings.init()

        expect($cookieSettings.hideWarningMessage).toHaveBeenCalled()
      })
    })
  })

  describe('Submitting the form', () => {
    beforeEach(async () => {
      document.querySelector = jest.fn()
      // Create a fake element to get/set display attribute
      document.querySelector.mockImplementation(() => { return { style: {} } })
    })

    describe('with No selected', () => {
      let submitEvent
      beforeEach(async () => {
        submitEvent = mockSubmitEvent('Off')
      })

      it('sets consent cookie', async () => {
        await new CookieSettings(cookieSettingsForm).submitSettingsForm(submitEvent)
        expect(submitEvent.preventDefault).toHaveBeenCalled()
        expect(CookieHelpers.setConsentCookie).toHaveBeenCalledWith({ analytics: false })
      })

      it('does not initialise Analytics', async () => {
        await new CookieSettings(cookieSettingsForm).submitSettingsForm(submitEvent)
        expect(InitialiseAnalytics).not.toHaveBeenCalled()
      })

      it('shows confirmation message and hides other messages', async () => {
        const $cookieSettings = await new CookieSettings(cookieSettingsForm)
        $cookieSettings.hideWarningMessage = jest.fn()
        $cookieSettings.hideErrorMessage = jest.fn()
        $cookieSettings.showConfirmationMessage = jest.fn()

        await $cookieSettings.submitSettingsForm(submitEvent)

        expect($cookieSettings.hideWarningMessage).toHaveBeenCalled()
        expect($cookieSettings.hideErrorMessage).toHaveBeenCalled()
        expect($cookieSettings.showConfirmationMessage).toHaveBeenCalled()
      })
    })

    describe('with Yes selected', () => {
      let submitEvent
      beforeEach(async () => {
        submitEvent = mockSubmitEvent('On')
      })

      it('sets consent cookie', async () => {
        await new CookieSettings(cookieSettingsForm).submitSettingsForm(submitEvent)
        expect(submitEvent.preventDefault).toHaveBeenCalled()
        expect(CookieHelpers.setConsentCookie).toHaveBeenCalledWith({ analytics: true })
      })

      it('initialises Analytics', async () => {
        await new CookieSettings(cookieSettingsForm).submitSettingsForm(submitEvent)
        expect(InitialiseAnalytics).toHaveBeenCalled()
      })

      it('shows confirmation message and hides other messages', async () => {
        const $cookieSettings = await new CookieSettings(cookieSettingsForm)
        $cookieSettings.hideWarningMessage = jest.fn()
        $cookieSettings.hideErrorMessage = jest.fn()
        $cookieSettings.showConfirmationMessage = jest.fn()

        await $cookieSettings.submitSettingsForm(submitEvent)

        expect($cookieSettings.hideWarningMessage).toHaveBeenCalled()
        expect($cookieSettings.hideErrorMessage).toHaveBeenCalled()
        expect($cookieSettings.showConfirmationMessage).toHaveBeenCalled()
      })
    })

    describe('with nothing selected', () => {
      let submitEvent
      beforeEach(async () => {
        submitEvent = mockSubmitEvent('Neither')
      })

      it('does not set consent cookie', async () => {
        await new CookieSettings(cookieSettingsForm).submitSettingsForm(submitEvent)
        expect(submitEvent.preventDefault).toHaveBeenCalled()
        expect(CookieHelpers.setConsentCookie).not.toHaveBeenCalled()
      })

      it('does not initialise Analytics', async () => {
        await new CookieSettings(cookieSettingsForm).submitSettingsForm(submitEvent)
        expect(InitialiseAnalytics).not.toHaveBeenCalled()
      })

      it('shows error message', async () => {
        const $cookieSettings = await new CookieSettings(cookieSettingsForm)
        $cookieSettings.showErrorMessage = jest.fn()

        await $cookieSettings.submitSettingsForm(submitEvent)

        expect($cookieSettings.showErrorMessage).toHaveBeenCalled()
      })
    })
  })
})
