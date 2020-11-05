'use strict'

// Convert component name to macro name
//
// This helper function takes a component name and returns the corresponding
// macro name.
//
// Component names are lowercase, dash-separated strings (button, date-input),
// whilst macro names have a `govuk` prefix and are camel cased (govukButton,
// govukDateInput).
const componentNameToMacroName = componentName => {
  const macroName = componentName
    .toLowerCase()
    .split('-')
    // capitalize each 'word'
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')

  return `dm${macroName}`
}

/**
 * Mocks the url_for method
 *
 * For certain components, we need to mock the url_for method in order to display
 * the component correctly.
 *
 * Eg: The header component needs the url_for method to determine whether to set
 * a nav item to active.
 *
 * @param {string} route
 */
const urlFor = route => {
  let value = '#'
  if (route === 'external.help') {
    value = '/help'
  } else if (route === 'external.render_login') {
    value = '/login'
  } else if (route === 'external.buyer_dashboard') {
    value = '/buyer-dashboard'
  } else if (route === 'external.supplier_dashboard') {
    value = '/supplier-dashboard'
  } else if (route === 'external.user_logout') {
    value = '/logout'
  }

  return value
}

exports.urlFor = urlFor
exports.componentNameToMacroName = componentNameToMacroName
