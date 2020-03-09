# Changelog

## Unreleased

See below for Changelog examples.

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
