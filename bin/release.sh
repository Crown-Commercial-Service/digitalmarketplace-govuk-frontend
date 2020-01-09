#!/bin/sh
#
# Usage: release.sh [--dry-run]
set -e

if [[ "$1" == "--dry-run" ]]; then
  DRY_RUN=true
  NPM_ARGS=" --dry-run"
  echo "Starting a dry run release..."
else
  echo "Starting a release..."
fi
echo " "
echo "This will:"
echo "- run the test suite"
echo "- build GOV.UK Frontend into the 'package/' directory"
echo "- build Digital Marketplace Frontend into the 'package/' directory"
echo "- check that you're logged in to npm as the correct user"
echo "- publish the package to npmjs.org if it has not been published already"
echo " "

read -r -p "Do you want to continue? [y/N] " continue_prompt

if [[ $continue_prompt != 'y' ]]; then
    echo "Cancelling release, if this was a mistake, try again and use 'y' to continue."
    exit 0
fi

npm run test
export DMTASK='preparing'
npm run build
unset DMTASK

if [ "$DRY_RUN" = "false" ]; then
  NPM_USER=$(npm whoami)
  if ! [ "digital-marketplace" == "$NPM_USER" ]; then
    echo "⚠️   FAILURE: You are not logged in with the correct user."
    echo "Please login using the details found in https://github.com/alphagov/digitalmarketplace-credentials"
    exit 1
  fi
fi

echo "📦  Publishing package..."

# Try publishing
cd package
npm publish $NPM_ARGS
echo "🗒 Package published!"
cd ..

if [ "$DRY_RUN" = "false" ]; then
  read -r -p "Would you like to logout of NPM? [y/N] " continue_prompt
  if [[ $continue_prompt == 'y' ]]; then
    echo "Logging out of NPM"
    npm logout
  fi
fi
