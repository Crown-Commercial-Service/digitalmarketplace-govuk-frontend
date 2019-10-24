#!/bin/sh
set -e
echo "≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡"
echo "TAGGING LATEST VERSION"
echo "--------------------------------------------------------------------------------"
git checkout master
git pull origin master
version=v$(jq -r ".version" package/package.json)
changelog="https://github.com/alphagov/digitalmarketplace-govuk-frontend/blob/master/CHANGELOG.md#"
echo Version:\ \ $version
echo "================================================================================"
git tag -a $version -m "Digital Marketplace GOV.UK Frontend release $version" -m "[Changelog]($changelog$version)"
echo "New tag created!"
echo "--------------------------------------------------------------------------------"
