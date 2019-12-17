# Publishing Digital Marketplace GOV.UK Frontend

## Bumping the release version

1. Checkout **master** and pull latest changes.

2. Run `nvm use` to ensure you are using the right version of Node.js and npm.

3. Run `npm install` to ensure you have the latest dependencies installed.

4. Create and checkout a new branch (`release-[version-number]`).
  The version number is determined by looking at the [current "Unreleased" CHANGELOG](../CHANGELOG.md) changes and updating the previous release number depending on the kind of entries:

  - `Breaking changes` corresponds to a `major` (1.X.X) change.
  - `New features` corresponds to a `minor` (X.1.X) change.
  - `Fixes` corresponds to a `patch` (X.X.1) change.

  For example if the previous version is `2.3.0` and there are entries for `Breaking changes` then the new release should be `3.0.0`.

5. Update [`CHANGELOG.md`](../CHANGELOG.md) "Unreleased" heading with the new version number.

6. Update [`package/package.json`](../package/package.json) version with the new version number.

7. Commit all the changes you made (Should only be 2 files) and push up to Github

8. Create a pull request and copy the changelog text.
   When reviewing the PR, check that the version numbers have been updated and the changelog

9. Once the Digital Marketplace GOV.UK Frontend pull request is approved, merge to **master**.

###  Publishing to NPM

10. Checkout **master** and pull the latest changes.

11. Log into npm `npm login`, using team [credentials](https://github.com/alphagov/digitalmarketplace-credentials/tree/master/pass/npmjs.org).

12. Run `npm run release`, you will be prompted to continue or cancel. This will run tests and build `package` folder before finally going on to publish the package to npm.

13. Log out from npm
```bash
npm logout
```

14. Add a card in Trello to update each Digital Marketplace frontend application.
