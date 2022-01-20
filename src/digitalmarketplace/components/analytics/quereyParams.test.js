/**
 * @jest-environment jsdom
 */

import { removeExcludedQueryParams } from './quereyParams'

const hostname = 'https://www.digitalmarketplace.service.gov.uk'

describe('removeExcludedQueryParams', () => {
  describe("when the url contains just the 'email' param", () => {
    it('returns the url without any params', () => {
      const pageQueryParams = '?email=test@example.com'
      const pageURL = hostname + pageQueryParams

      const results = removeExcludedQueryParams(pageURL, pageQueryParams)
      expect(results).toEqual('https://www.digitalmarketplace.service.gov.uk')
    })
  })

  describe("when the url contains just the 'email_address' param", () => {
    it('returns the url without any params', () => {
      const pageQueryParams = '?email_address=example@test.com'
      const pageURL = hostname + pageQueryParams

      const results = removeExcludedQueryParams(pageURL, pageQueryParams)
      expect(results).toEqual('https://www.digitalmarketplace.service.gov.uk')
    })
  })

  describe("when the url contains the 'email' param and a permitted param", () => {
    it('returns the url with just the permitted param', () => {
      const pageQueryParams = '?email=test@example.com&search=something'
      const pageURL = hostname + pageQueryParams

      const results = removeExcludedQueryParams(pageURL, pageQueryParams)
      expect(results).toEqual('https://www.digitalmarketplace.service.gov.uk?search=something')
    })
  })

  describe("when the url contains the 'email_address' param and a permitted param", () => {
    it('returns the url with just the permitted param', () => {
      const pageQueryParams = '?email_address=test@example.com&q=somethingElse'
      const pageURL = hostname + pageQueryParams

      const results = removeExcludedQueryParams(pageURL, pageQueryParams)
      expect(results).toEqual('https://www.digitalmarketplace.service.gov.uk?q=somethingElse')
    })
  })

  describe("when the url contains the 'email_address' and 'email_address' param and a permitted param", () => {
    it('returns the url with just the permitted param', () => {
      const pageQueryParams = '?email=test@example.com&email_address=test@example.com&framework=somethingMore'
      const pageURL = hostname + pageQueryParams

      const results = removeExcludedQueryParams(pageURL, pageQueryParams)
      expect(results).toEqual('https://www.digitalmarketplace.service.gov.uk?framework=somethingMore')
    })
  })

  describe('when the url contains just a permitted param', () => {
    it('returns the url without any changes', () => {
      const pageQueryParams = '?brief=1234567'
      const pageURL = hostname + pageQueryParams

      const results = removeExcludedQueryParams(pageURL, pageQueryParams)
      expect(results).toEqual('https://www.digitalmarketplace.service.gov.uk?brief=1234567')
    })
  })

  describe('when the url contains no params', () => {
    it('returns the url without any changes', () => {
      const pageQueryParams = ''
      const pageURL = hostname

      const results = removeExcludedQueryParams(pageURL, pageQueryParams)
      expect(results).toEqual('https://www.digitalmarketplace.service.gov.uk')
    })
  })

  describe('when the url contains two query params including one with an email', () => {
    it('returns the url without the email param', () => {
      const pageQueryParams = '?next=/admin/users?email_address=test@example.com'
      const pageURL = hostname + '/user/login' + pageQueryParams

      const results = removeExcludedQueryParams(pageURL, pageQueryParams)
      expect(results).toEqual('https://www.digitalmarketplace.service.gov.uk/user/login?next=/admin/users')
    })
  })
})
