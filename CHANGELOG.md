# Changelog

See below for Changelog examples.

## Unreleased

💥 Breaking changes:
  
- GOV.UK Frontend updated to version 3

  To migrate, follow the instructions on the [govuk-frontend repo](https://github.com/alphagov/govuk-frontend/blob/master/CHANGELOG.md#300-breaking-release)

  ([PR #149](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/149))

🔧 Fixes:

- Option select header spacing adjustments [PR #219](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/219)


## 2.6.0

🆕 New features:

  - The Header component now supports active nav items [PR #207](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/207)
    - The current active path can be passed into the component call:
      ```
      {{ dmHeader({
        "role": "supplier",
        "active": request.path
      })}}
      ```

## 2.5.0

🆕 New features:

  - New component: Digital Marketplace Attachment component
    - Use the component `{{ dmAttachment({...}) }}`. For its parameters, see its README and/or YAML. For examples, see the review app. [PR #200](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/200)

## 2.4.1

🔧 Fixes:

  - Option Select now works properly in IE11. [PR #193](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/193)

## 2.4.0

🆕 New features:

  - New component: Digital Marketplace Previous Next Pagination component
    - Use the component `{{ dmPreviousNextPagination({...}) }}`. For its parameters, see its README and/or YAML. For examples, see the review app. [PR #189](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/189)

## 2.3.0

🆕 New features:

  - New component: Digital Marketplace Search Box component
    - Use the component `{{ dmSearchBox({...}) }}`. For its parameters, see its README and/or YAML. For examples, see the review app. [PR #185](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/185)

🔧 Fixes:

  - Option Select now uses camelCase instead of snake_case to match govuk-frontend [PR #187](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/187)

## 2.2.0

🆕 New features:

  - New component: Digital Marketplace Option Select component
    - Use the component `{{ dmOptionSelect({...}) }}`. For its parameters, see its README and/or YAML. For examples, see the review app. [PR #183](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/183)

## 2.1.0

🆕 New features:

  - Footer component now contains link to accessibility statement [PR #180](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/180)
  
## 2.0.0

💥 Breaking changes:

  - GOV.UK Frontend has been removed from the package. [PR #173](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/173)
    - You will need to install GOV.UK Frontend separately - we recommend using (npm)](docs/installation/installing-with-npm.md).
    - You should ensure that GOV.UK Frontend templates are loaded into your templating environment. If you are using v3, including `node_modules/govuk-frontend` should be sufficient. If you are using v2, you will need to prefix the templates with `govuk` to ensure they are correctly located.
    - You should [add GOV.UK Frontend to your Sass load paths](https://frontend.design-system.service.gov.uk/importing-css-assets-and-javascript/#simplify-sass-import-paths). If you're using v2, you will have to make these available at `govuk/`.

🆕 New features:

  - Component Nunjucks templates are now compatible with Jinja2 as-is. [PR #174](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/174)
  - You no longer need to use the govuk-frontend macros bundled with digitalmarketplace-govuk-frontend [PR #171](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/171)

🔧 Fixes:

  - The component macros no longer use relative imports, which do not work with Jinja2 [PR #171](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/171)

## 1.1.1

🔧 Fixes:

  - The list input component input label numbers now align properly on smaller screens [PR #168](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/168)

## 1.1.0

🆕 New features:

  - You can now use the parameter `question_advice` with the list input component to show question advice to the user [PR #163](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/163)
  - You can now use the parameter `itemLabelPrefix` with the list input component to add a visually hidden label to inputs [PR #163](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/163)

🔧 Fixes:

  - The list input component now has simpler fieldset properties [PR #163](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/163)
  - The list input component now has the first input id end in `-1` as expected by the content loader [PR #163](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/163)

## 1.0.1

🔧 Fixes:
  - The cookie banner component now has a `aria-label` property [PR #161](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/161)
  - The alert and banner components no longer have a focusable state [PR #158](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/158)

## 1.0.0

💥 Breaking changes:
  
- Move Digital Marketplace files around

  We've moved some files around so their locations are consistent with govuk-frontend.

  - The Digital Marketplace JavaScript file is now found at `digitalmarketplace-govuk-frontend/digitalmarketplace/all.js`
  - The Digital Marketplace Sass file is now found at `digitalmarketplace-govuk-frontend/digitalmarketplace/all.scss`

  You must change how you copy or import Digital Marketplace JavaScript:

  ```
  // to copy Digital Marketplace JavaScript using gulp-include
  //= require ../../../node_modules/digitalmarketplace-govuk-frontend/digitalmarketplace/all.js
  ```

  You may need to change how you import Digital Marketplace Sass:

  ```
  @import "node_modules/digitalmarketplace-govuk-frontend/digitalmarketplace/all"
  ```

  ([PR #153](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pulls/153))

- Move govuk-frontend templates and styles to `govuk/`

  You must change any paths containing `govuk-frontend/` to use `govuk/` instead.

  For example, to import govukInput you now write:

  ```
  {% from "govuk/components/input/macro.njk" import govukInput %}
  ```

  ([PR #151](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/151))

🆕 New features:

  - New component: Digital Marketplace List Input component
    - Use the component `{{ dmListInput({...}) }}`. For its parameters, see its README and/or YAML. For examples, see the review app.

🔧 Fixes:
  - Ability to wrap components with `<main>` to avoid accessibility errors. [PR #148](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/148)
  - Add title to iFrames. [PR #148](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/148)
  - Fix "open in new tab" links [PR #148](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/148)

## 0.9.1

🔧 Fixes:
  - Javascript to support error message on cookie settings page [PR #124](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/124)

## 0.9.0

🆕 New features:
  - Representative usage examples for the banner component [PR #114](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/114).

🔧 Fixes:
  - Add ARIA roles and labels to alert and banner components [PR #113](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/113)
  - Adjust tabindex attribute on alert and banner components [PR #113](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/113)
  - Fix mismatched tags in the banner component [PR #114](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/114).
  - Ensure links are readable in the banner component [PR #114](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/114).

## 0.8.1

🔧 Fixes:
  - Deletes cross domain tracking cookie (along with other analytics cookies) when the user changes their preferences.
  - Adds test coverage for cookie helper functions

## 0.8.0

🆕 New features:

- Adding gov.uk cross-domain tracking to Digital Marketplace analytics, based on the old [Frontend Toolkit analytics code](https://github.com/alphagov/digitalmarketplace-frontend-toolkit/blob/master/toolkit/javascripts/analytics/_register.js#L16).
    - Includes function calls to strip personal data from both DMP analytics events and cross domain tracker events.

## 0.7.0

🆕 New features:

- New component: Digital Marketplace Banner component

  *Installing component:*
  1. Check config.py has this line for jinja to find the components
      ```
                  os.path.join(repo_root, 'node_modules', 'digitalmarketplace-govuk-frontend')
      ```

  2. Import the component in `_base_page.html`
     `{% from "digitalmarketplace/components/banner/macro.njk" import dmBanner %}`

  3. Use the component `{{ dmBanner({...}) }}`. For its parameters, see its README and/or YAML. For examples, see the review app.

  ([PR #87](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/87))

🔧 Fixes:

- Fix node version in `.nvmrc` and `package/package.json` to match docker images.

## 0.6.5

🔧 Fixes:

- Fix typo in footer. ([PR #79](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/79))
- Fix margin right for buttons in cookie banner ([PR #78](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/78))

### 0.6.4

🔧 Fixes:

- Remove Google Analytics tracker name.

## 0.6.3

🔧 Fixes:

- Initialise Analytics if consent cookie is present.

## 0.6.2

🔧 Fixes:

- Fix incorrect Google Analytics tracking ID.
  ([PR #70](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/70))

## 0.6.1

🔧 Fixes:

- Fix pre-filled values on the Cookie Settings form, by parsing dm_cookies_policy as a JSON object.

  ([PR #67](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/67))

## 0.6.0

🆕 New features:

- New component: Cookie settings page javascript

  - Allows a user to set their analytics cookie preferences

  ([PR #60](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/60))

🔧 Fixes:

- Use dm_cookies_policy to be in line with our other custom cookies
- Use template parameters for Cookie Settings URL and Cookie Info URL
- Banner should not be displayed on the Cookie Settings page
- Prefix custom CSS classes with 'dm-'

  ([PR #62](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/62))

## 0.5.0

🆕 New features:

- New component: Cookie banner and analytics

  *Requirement before using this component:*
  - To use this the application must be using `govuk-frontend` template
  - There must be functionality for the user to change their cookie preferences

  *Installing component:*
  1. Check config.py has this line for jinja to find the components
      ```
      os.path.join(repo_root, 'node_modules', 'digitalmarketplace-govuk-frontend')
      ```

  2. Import the component in `_base_page.html`
     ```
     {% from "digitalmarketplace/components/cookie-banner/macro.njk" import dmCookieBanner %}
     ```

  3. Include the component `{{ dmCookieBanner({...}) }}` in the `{% block header %}` block.
     For its parameters, see its README and/or YAML. For examples, see the review app.

  ([PR #49](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/49))

🔧 Fixes:

- Fix option in header component

  ([PR #58](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/58))

## 0.4.1

🔧 Fixes:

- Change link text for G-Cloud supplier A to Z link in footer

  ([PR 55](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/55))

## 0.4.0

🆕 New features:

- New component: Digital Marketplace Alert component

  *Installing component:*
  1. Check config.py has this line for jinja to find the components
      ```
                  os.path.join(repo_root, 'node_modules', 'digitalmarketplace-govuk-frontend')
      ```

  2. Import the component in `_base_page.html`
     `{% from "digitalmarketplace/components/alert/macro.njk" import dmAlert %}`

  3. Use the component `{{ dmAlert({...}) }}`. For its parameters, see its README and/or YAML. For examples, see the review app.

  ([PR #45](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/45))

## 0.3.1

🔧 Fixes:

- Update release script

  We changed the release process but did not update the script as a result we had
  to unpublish v0.3.0 from npm.

  ([PR #42](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/42))

## 0.3.0

🆕 New features:

- New component: Digital Marketplace Header component

  *Requirement before using this component:*
  - To use this the application must be using `govuk-frontend` template
  - To use this the application must be using `govuk-frontend` phase banner as phase tag
    is no longer part of the header and sits underneath and outside the header

  *Installing component:*
  1. Check config.py has this line for jinja to find the components
      ```
                  os.path.join(repo_root, 'node_modules', 'digitalmarketplace-govuk-frontend')
      ```

  2. Import the component in `_base_page.html`
     `{% from "digitalmarketplace/components/header/macro.njk" import dmheader %}`

  3. Use the component `{{ dmHeader({}) }}`

  ([PR #25](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/25))

- New component: Digital Marketplace Footer component

  *Requirement before using this component:*
  - To use this the application must be using `govuk-frontend` template
  - digitalmarketplace-util v48.8.0+ must be installed

  *Installing component:*
  1. Check config.py has this line for jinja to find the components
      ```
                  os.path.join(repo_root, 'node_modules', 'digitalmarketplace-govuk-frontend')
      ```

  2. Import the component in `_base_page.html`
     `{% from "digitalmarketplace/components/footer/macro.njk" import dmFooter %}`

  3. Use the component `{{ dmFooter({}) }}`

  ([PR #21](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/21))


## 0.2.1

🔧 Fixes:

- Fix layout issues with error pages

  Error pages content was not centrally aligned.

  Check frontend app `config.py` includes `os.path.join(repo_root, 'node_modules', 'digitalmarketplace-govuk-frontend', 'digitalmarketplace', 'templates'),` to lookup the error templates

  Make sure `base_page.html` is using `mainContent` and `pageTitle` blocks

  ([PR #23](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/23))

## 0.2.0

🆕 New features:

- Add error templates

  Error templates which use GOV.UK Frontend classes for styling.

  ([PR #14](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/14))

- Add site verification and custom dimension tracking

  This originally originally built into `digitalmarketplace-frontend-toolkit` and will
  be needed in the future when we do away with `digitalmarketplace-frontend-toolkit`.

  ([PR #15](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/15))

## 0.1.0

🆕 New features:

- Import and use govuk-frontend v2.13.0

  ([PR #1](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/1))


## Changelog Examples

💥 Breaking changes:

- Pull Request Title goes here

  Description goes here (optional)

  To migrate you need to change: X

  ([PR #N](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/N))

🆕 New features:

- Pull Request Title goes here

  Description goes here (optional)

  ([PR #N](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/N))

🔧 Fixes:

- Pull Request Title goes here

  Description goes here (optional)

  ([PR #N](https://github.com/alphagov/digitalmarketplace-govuk-frontend/pull/N))
