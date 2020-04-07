/**
 * @jest-environment jsdom
 */
import stripPII from './pii'

beforeAll(() => {
  // add the script GA looks for in the document
  document.body.appendChild(document.createElement('script'))
})

beforeEach(() => {
  // Set up mock
  window.ga = jest.fn()
})

afterEach(() => {
  window.ga.mockClear()
})

describe('stripPII', () => {
  it('strips email addresses from strings', () => {
    const results = stripPII('this is an@email.com address')
    expect(results).toEqual('this is [email] address')
  })

  it('strips email addresses from objects', () => {
    const obj = {
      email: 'this is an@email.com address',
      another: 'key'
    }

    const strippedObj = {
      email: 'this is [email] address',
      another: 'key'
    }

    const results = stripPII(obj)
    expect(results).toEqual(strippedObj)
  })

  it('strips email addresses from arrays', () => {
    const arr = [
      'this is an@email.com address',
      'this is another item'
    ]

    const strippedArr = [
      'this is [email] address',
      'this is another item'
    ]

    const results = stripPII(arr)
    expect(results).toEqual(strippedArr)
  })
})
