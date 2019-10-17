# Publishing pre-release of GOV.UK Frontend

We use pre-releases when:
- We are working on a new feature and want to see it in other Digital Marketplace frontend applications
- We want to try an experimental feature as if it's pushed to npm.

This is done by pushing the files used for a Digital Marketplace GOV.UK Frontend release (the contents of the `package` directory) to a new branch which can be installed by npm as if it was a released npm package.

No changes get published to npm as part of the process.

1. Checkout the branch you want to pre-release and pull latest changes.

2. Run `nvm use` to ensure you are using the right version of Node.js and npm.

3. Run `npm install` to ensure you have the latest dependencies installed.

4. Run `npm run release-to-branch`.

There should now be a branch `pre-release-[your-branch-name-here]` pushed to the Digital Marketplace GOV.UK Frontend remote origin.

To install this pre-release branch in another project, you can run the following command:

```bash
npm install --save alphagov/digitalmarketplace-govuk-frontend#[SHA]
```
