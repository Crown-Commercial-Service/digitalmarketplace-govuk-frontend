# Publishing Digital Marketplace GOV.UK Frontend

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

7. Save the changes. Do not commit.

8. Run `npm run pre-release`, you will be prompted to continue or cancel.

9. (Optional) Test in with any Digital Marketplace frontend application

  If you want to test your changes work correctly when used in any of the Digital Marketplace frontend applications you can use [npm link](https://docs.npmjs.com/cli/link) to test before publishing.

  ```bash
  cd ../digitalmarketplace-admin-frontend # Path to the frontend application you would like to test with
  git checkout master
  git pull
  npm install # note running `npm install` after `npm link` will destroy the link.
  npm link ../digitalmarketplace-govuk-frontend/package/ # npm link to the path where digitalmarketplace-govuk-frontend is on your machine
  ```

  When you have finished you need to unlink the package

  ```bash
  npm unlink ../digitalmarketplace-govuk-frontend/package/
  ```

10. Create a pull request and copy the changelog text.
   When reviewing the PR, check that the version numbers have been updated.

11. Once the Digital Marketplace GOV.UK Frontend pull request is approved, merge to **master**.

12. Checkout **master** and pull the latest changes.

13. Log into npm, using team [credentials](https://github.com/alphagov/design-system-team-credentials/tree/master/npm/govuk-patterns-and-tools).

14. Run `npm run release`, you will be prompted to continue or cancel.

15. Create a release in the [Github interface](https://github.com/alphagov/digitalmarketplace-govuk-frontend/releases/new)
  - select the latest tag version
  - set "Digtial Marketplace GOV.UK Frontend release v[version-number]" as the title
  - add release notes from changelog
  - add a summary of highlights
  - publish release

16. Log out from npm
```bash
npm logout
```

19. Add a card in Trello to update each Digital Marketplace frontend application.
