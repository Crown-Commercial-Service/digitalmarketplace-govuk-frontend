# Backporting

Each version of digitalmarketplace-govuk-frontend works only with a specific
versions of govuk-frontend; currently the main branch requires govuk-frontend
3.x.x. govuk-frontend 2.x.x is deprecated and the Digital Marketplace is
working to migrate its apps away from it, but occasionally you may need to make
a change to digitalmarketplace-govuk-frontend for apps that still use
govuk-frontend 2.

As well as the `main` branch, this repo has a `govuk-frontend-2` branch which
is used to release new versions of the 2.x.x series of
digitalmarketplace-govuk-frontend.

Normally you should make any changes first to the main branch, and then apply
all changes to the govuk-frontend-2 branch. This is called "backporting".


## When to backport

Security fixes to code that we publish should always be backported.

If a new feature is added, you might want to backported it so it can be used in
apps using govuk-frontend 2.

Some changes do not need to be backported. For instance, bumping dependencies
in `package.json` does not always result in different code in the published
package, so there is no need to backport the changes.


## How to backport

The simplest way to do a backport is to [cherry-pick](https://www.jvt.me/posts/2018/10/28/git-cherry-pick-backport-replay-changes/) the changes you want from the main branch into the 2.x.x series branch:

1. Checkout **govuk-frontend-2** and pull latest changes.

2. Run `nvm use` to ensure you are using the right version of Node.js and npm.

3. Run `npm install` to ensure you have the latest dependencies installed.

4. Create and checkout a new branch (`release-[version-number]`).
  The version number is determined by [comparing the CHANGELOG for the two branches](https://github.com/alphagov/digitalmarketplace-govuk-frontend/compare/master..govuk-frontend-2) and updating the previous release number depending on the kind of entries:

  - `New features` corresponds to a `minor` (X.1.X) change.
  - `Fixes` corresponds to a `patch` (X.X.1) change.

  For example if the previous version is `2.3.0` and there are entries for `Fixes` then the new release should be `2.3.1`.

5. For each change that you want you will need to cherry pick each commit:

  - Have a look at the pull request(s) for the change
  - For each commit **in commit order** copy the git commit hash and run `git cherry-pick -x <commit hash>`

  You may need to fix conflicts, especially in `CHANGELOG.md`.

  Cherry picking can be complicated, so don't be afraid to google things! Once you are more confident there are [ways to speed up the process](https://gitbetter.substack.com/p/how-to-use-git-cherry-pick-effectively).

6. Once you are finished update [`CHANGELOG.md`](../CHANGELOG.md) "Unreleased" heading with the new version number and change the link to each PR to make it clear that the PR has been backported.

7. Update [`package/package.json`](../package/package.json) version with the new version number.

8. Commit the changes to `CHANGELOG.md` and `package/package.json` with the commit message "Release [version number]".

9. Create a pull request against branch **govuk-frontend-2** and copy the changelog text.
   When reviewing the PR, check that the version numbers have been updated and the changelog

10. Once the Digital Marketplace GOV.UK Frontend pull request is approved, merge to **govuk-frontend-2**.

11. Create a release in the [GitHub interface](https://github.com/alphagov/digitalmarketplace-govuk-frontend/releases/new)
  - select the latest tag version
  - set "Digital Marketplace GOV.UK Frontend release v[version-number]" as the title
  - add release notes from changelog
  - mark releases as pre-release so it doesn't show up as the latest release in GitHub
  - publish release

A [Github Action](../.github/workflows) will detect this and push the release to npm with the **govuk-frontend-2** dist-tag.
