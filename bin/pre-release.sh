#!/bin/sh
set -e

echo "Starting a pre-release..."
echo " "
echo "This will:"
echo "- run the test suite"
echo "- build GOV.UK Frontend into the 'package/' directory"
#echo "- build Digital Marketplace Frontend into the 'package/' directory"
echo "- commit all changes and push the branch to remote"
echo " "

read -r -p "Do you want to continue? [y/N] " continue_prompt

if [[ $continue_prompt != 'y' ]]; then
    echo "Cancelling pre-release, if this was a mistake, try again and use 'y' to continue."
    exit 0
fi

npm run test
npm run build

ALL_PACKAGE_VERSION=$(node -p "require('./package/package.json').version")
TAG="v$ALL_PACKAGE_VERSION"
CURRENT_BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)

if [ $(git tag -l "$TAG") ]; then
    echo "⚠️ Git tag already exists."
    exit 1;
else
    git add .
    git commit -m "Release $TAG"
    # set upstream so that we can push the branch up
    git push --set-upstream origin $CURRENT_BRANCH_NAME
    git push
    echo "🗒 All done. Ready to create a pull request. Once approved, run npm run release"
fi
