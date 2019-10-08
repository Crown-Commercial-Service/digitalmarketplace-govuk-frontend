# Updating Digital Marketplace GOV.UK Frontend using Node.js package manager (npm)

You can update with Node.js package manager (npm) if you [originally installed
GOV.UK Frontend with npm](https://github.com/alphagov/govuk-frontend/blob/master/docs/installation/installing-with-npm.md).

## Find out which version you're using

To find out which version of Digital Marketplace GOV.UK Frontend your project is using, you can run:

```shell
npm list digitalmarketplace-govuk-frontend
```

If you do not have command line access, you can see the version number in the
`package.json` file in the root of your project directory. For example:

```json
'digitalmarketplace-govuk-frontend': ‘1.0.0’
```

## Update Digital Marketplace GOV.UK Frontend using npm

To find out the latest version of Digital Marketplace GOV.UK Frontend, check the [release
notes](https://github.com/alphagov/digitalmarketplace-govuk-frontend/releases) in the Digital Marketplace GOV.UK Frontend GitHub repository.

You may need to make code changes to keep Digital Marketplace GOV.UK Frontend working in your project, if the major version number changes when you update. The major version number is the first digit in the version number.

To update to the most recent version, run:

```shell
npm install digitalmarketplace-govuk-frontend@latest
```

If you want to install an earlier version, replace `latest` with the version that you want to update to. For example:

```shell
npm install digitalmarketplace-govuk-frontend@0.1.0
```
