Digital Marketplace GOV.UK Frontend ·
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Known Vulnerabilities](https://snyk.io//test/github/alphagov/digitalmarketplace-govuk-frontend/badge.svg?targetFile=package.json)](https://snyk.io//test/github/alphagov/digitalmarketplace-govuk-frontend?targetFile=package.json)
=====================

This repository does two things:

- it provides a central repository for custom components used in the Digital Marketplace
- it imports GOV.UK Frontend and serves it to Digital Marketplace frontend applications
  where they can consume GOV.UK Frontend and all the custom components in a single dependency

The problem we are trying to solve:

- it is difficult to ensure that all our applications are using the same version of GOV.UK Frontend and digitalmarketplace-frontend-toolkit (which is being replaced).
- it is difficult to ensure that we are only importing and using css/js for components we are actually using and not been removed.

## GOV.UK Frontend

GOV.UK Frontend contains the code you need to start building a user interface
for government platforms and services.

See live examples of GOV.UK Frontend components, and guidance on when to use
them in your service, in the [GOV.UK Design
System](https://design-system.service.gov.uk/).

### Contact the GOV.UK Frontend team

GOV.UK Frontend is maintained by a team at Government Digital Service. If you want to know more about GOV.UK Frontend, please email the [Design System
team](mailto:govuk-design-system-support@digital.cabinet-office.gov.uk) or get in touch with them on [Slack](https://ukgovernmentdigital.slack.com/messages/govuk-design-system).

## Digital Marketplace GOV.UK Frontend

Digital Marketplace GOV.UK Frontend contains the code you need to start building a user interface for Digital Marketplace.

### Contact the Digital Marketplace team

Digital Marketplace GOV.UK Frontend is maintained by a team at Government Digital Service. If you want to know more about Digital Marketplace GOV.UK Frontend, please email the [Digital Marketplace team](mailto:digital-marketplace-development@digital.cabinet-office.gov.uk).

## Quick start

### 1. Install with npm (recommended)

We recommend [installing Digital Marketplace GOV.UK Frontend using node package manager
(npm)](docs/installation/installing-with-npm.md).

## Getting updates

To be notified when there’s a new release:

- [watch the digitalmarketplace-govuk-frontend Github repository](https://help.github.com/en/articles/watching-and-unwatching-repositories)

Find out how to [update with npm](docs/installation/updating-with-npm.md).

## Licence

Unless stated otherwise, the codebase is released under the MIT License. This
covers both the codebase and any sample code in the documentation. The
documentation is &copy; Crown copyright and available under the terms of the
Open Government 3.0 licence.
