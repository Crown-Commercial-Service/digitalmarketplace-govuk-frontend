
// Based on https://github.com/alphagov/static/pull/1863
const EMAIL_PATTERN = /[^\s=/?&]+(?:@|%40)[^\s=/?&]+/g

// Not quite sure what this is doing,
// see https://github.com/alphagov/digitalmarketplace-frontend-toolkit/blob/master/toolkit/javascripts/analytics/_govukAnalytics.js#L19
const PIISafe = function (value) {
  this.value = value
}

function stripPII (value) {
  if (typeof value === 'string') {
    return stripPIIFromString(value)
  } else if (Object.prototype.toString.call(value) === '[object Array]' || Object.prototype.toString.call(value) === '[object Arguments]') {
    return stripPIIFromArray(value)
  } else if (typeof value === 'object') {
    return stripPIIFromObject(value)
  } else {
    return value
  }
}

function stripPIIFromString (string) {
  return string.replace(EMAIL_PATTERN, '[email]')
}

function stripPIIFromObject (object) {
  if (object) {
    if (object instanceof PIISafe) {
      return object.value
    } else {
      for (var property in object) {
        var value = object[property]

        object[property] = stripPII(value)
      }
      return object
    }
  }
}

function stripPIIFromArray (array) {
  for (var i = 0, l = array.length; i < l; i++) {
    var elem = array[i]

    array[i] = stripPII(elem)
  }
  return array
}

export default stripPII
