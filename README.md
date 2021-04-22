Digital Marketplace GOV.UK Frontend ·
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Known Vulnerabilities](https://snyk.io/test/github/alphagov/digitalmarketplace-govuk-frontend/badge.svg?targetFile=package.json)](https://snyk.io/test/github/alphagov/digitalmarketplace-govuk-frontend?targetFile=package.json)
=====================

This repository provides a central repository for custom components used in the Digital Marketplace

The problem we are trying to solve:

- it is difficult to ensure that all our applications are using the same version of GOV.UK Frontend and digitalmarketplace-frontend-toolkit (which is being replaced).
- it is difficult to ensure that we are only importing and using css/js for components we are actually using and not been removed.

## Dependencies

* GOV.UK Frontend
  * GOV.UK Frontend contains the code you need to start building a user interface for government platforms and services.
  * See live examples of GOV.UK Frontend components, and guidance on when to use
them in your service, in the [GOV.UK Design
System](https://design-system.service.gov.uk/).
  * GOV.UK Frontend is maintained by a team at Government Digital Service. If you want to know more about GOV.UK Frontend, please email the [Design System
team](mailto:govuk-design-system-support@digital.cabinet-office.gov.uk) or get in touch with them on [Slack](https://ukgovernmentdigital.slack.com/messages/govuk-design-system).

## Digital Marketplace GOV.UK Frontend

Digital Marketplace GOV.UK Frontend contains the code you need to start building a user interface for Digital Marketplace.

### Contact the Digital Marketplace team

Digital Marketplace GOV.UK Frontend is maintained by a team at Government Digital Service. If you want to know more about Digital Marketplace GOV.UK Frontend, please email the [Digital Marketplace team](mailto:digital-marketplace-development@digital.cabinet-office.gov.uk).

## Quick start

### 1. Install with npm (recommended)

We recommend installing GOV.UK Frontend and Digital Marketplace GOV.UK Frontend using node package manager (npm).

```
npm install govuk-frontend digitalmarketplace-govuk-frontend
```

Digital Marketplace GOV.UK Frontend has GOV.UK Frontend as a [`peerDependency`](https://nodejs.org/es/blog/npm/peer-dependencies/) so you do not need to install GOV.UK Frontend with npm, however it is recommended.

### 2. Add GOV.UK Frontend to your Sass load paths

Digital Marketplace GOV.UK Frontend relies on GOV.UK Frontend being available to Sass.

If you're using Node Sass you can add GOV.UK Frontend to your Sass load paths using

```
{
  includePaths: ['node_modules/digitalmarketplace-govuk-frontend']
}
```

### 3. Load templates from GOV.UK Frontend

If you are using v2 of GOV.UK Frontend, you'll need to ensure the `node_modules/govuk-frontend` directory is loaded into your templating environment with a `govuk` prefix so that Digital Marketplace components can target the correct GOV.UK Frontend components.

With v3, targetting the `node_modules/govuk-frontend` directory is sufficient, as there is already a `govuk` subfolder.

## Getting updates

To be notified when there’s a new release:

- [watch the digitalmarketplace-govuk-frontend Github repository](https://help.github.com/en/articles/watching-and-unwatching-repositories)

Find out how to [update with npm](docs/installation/updating-with-npm.md).


## Developing new components

We use gulp to automate various tasks. Below we will detail what each part of the process is
and what task are run


## 1. Installing the repo

After cloning this repository you will need to run `npm install`. After npm has successfully installed
all packages and dependencies, an npm `postinstall` script will automatically run to do the following tasks:

- Removes the `govuk` folder containing `govuk-frontend` from `src`(if it exists)
- Copy `govuk-frontend` from `node_modules` to `src/govuk`

The reason for copying `govuk-frontend` to `src/govuk` is to ensure that `govuk/` is available for templates in testing and development environments.

## 2. Developing components/features and previewing

Run `npm run dev`

- compiles sass and js from `src` and places in `app/public`
- watch task for any file changes to `src`, compiles and reloads the browser (using browsersync)
- Start the webserver and reload the server if any server config changes (using nodemon)

## 3. Testing features in apps

Follow the steps in `docs/publishing-a-pre-release.md` to push a branch to GitHub as a release that can be consumed by other NodeJS apps.

Alternatively, you can create a package locally using `npm run build`:

    # in digitalmarketplace-govuk-frontend
    $ npm run build
    # change to an app
    $ cd ../digitalmarketplace-user-frontend
    $ npm install ../digitalmarketplace-govuk-frontend/package

## 3. Publishing

Follow the steps in `docs/publishing.md`.

## Using govuk-frontend v2

Release series 2.x.x of digitalmarketplace-govuk-frontend supports govuk-frontend v2.

If you need to backport changes to the 2.x.x series follow the steps in [`docs/backporting.md`](docs/backporting.md).

## Licence

Unless stated otherwise, the codebase is released under [the MIT License][mit].
This covers both the codebase and any sample code in the documentation.

The documentation is [&copy; Crown copyright][copyright] and available under the terms
of the [Open Government 3.0][ogl] licence.

[Digital Marketplace]: https://github.com/alphagov?q=digitalmarketplace&type=&language=
[GOV.UK Frontend]: https://github.com/alphagov/govuk-frontend
[Digital Marketplace GOV.UK Frontend]: https://github.com/alphagov/digitalmarketplace-govuk-frontend

[mit]: LICENCE
[copyright]: http://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/
[ogl]: http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
