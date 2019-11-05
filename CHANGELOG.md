# Changelog

## Unreleased

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
