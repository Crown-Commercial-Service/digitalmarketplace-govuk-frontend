const EXCLUDED_PARAMS = ['email', 'email_address']

const removeExcludedQueryParams = (pageURL, pageQueryParams) => {
  if (pageQueryParams) {
    let currentQueryParams = '&' + pageQueryParams.replace('?', '') + '&'

    EXCLUDED_PARAMS.forEach((param) => {
      const indexOfParam = currentQueryParams.indexOf('&' + param + '=')

      if (indexOfParam > -1) {
        const indexOfEnd = currentQueryParams.indexOf('&', indexOfParam + 1)
        currentQueryParams = currentQueryParams.slice(0, indexOfParam) + currentQueryParams.slice(indexOfEnd, currentQueryParams.length)
      }
    })

    currentQueryParams = currentQueryParams.replace('&', '?').slice(0, -1)

    return pageURL.replace(pageQueryParams, currentQueryParams)
  } else {
    return pageURL
  }
}

// const updateURL = () => {
//   const pageURL = window.location.href
//   const pageQueryParams = window.location.search;

//   return removeExcludedQueryParams(
//     pageURL,
//     pageQueryParams
//   )
// }

export { removeExcludedQueryParams }
