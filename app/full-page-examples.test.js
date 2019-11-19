/* eslint-env jest */

const request = require('request')
const cheerio = require('cheerio')

const configPaths = require('../config/paths.json')
const PORT = configPaths.ports.test

const expectedPages = [
  'page-not-found'
]

// Returns a wrapper for `request` which applies these options by default
const requestPath = request.defaults({
  baseUrl: `http://localhost:${PORT}/full-page-examples/`,
  headers: {
    'Content-Type': 'text/plain'
  }
})

describe(`http://localhost:${PORT}/full-page-examples/`, () => {
  describe.each(expectedPages)('%s', path => {
    it('should resolve with a http status code of 200', done => {
      requestPath.get(path, (err, res) => {
        expect(res.statusCode).toEqual(200)
        done(err)
      })
    })

    it('should resolve with a ‘Content-Type’ header of "text/html"', done => {
      requestPath.get(path, (err, res) => {
        expect(res.headers['content-type']).toContain('text/html')
        done(err)
      })
    })

    it('should prevent search indexing', done => {
      requestPath.get(path, (err, res) => {
        expect(res.headers['x-robots-tag']).toEqual('none')
        done(err)
      })
    })
  })

  describe('/full-page-examples/', () => {
  })
})
