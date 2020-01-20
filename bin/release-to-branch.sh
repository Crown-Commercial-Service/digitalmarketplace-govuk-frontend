#!/bin/sh
set -e

CURRENT_BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
BRANCH_NAME="pre-release-$CURRENT_BRANCH_NAME"

# Check if there are files that need to be commited
if [[ -n $(git status --porcelain) ]]; then
  echo "⚠️ You have unstaged files, please commit these and then try again."
  exit 1
fi

# Remove local branch is it already exists
if [ `git branch --list $BRANCH_NAME` ]; then
  echo "⚠️ Cleaning up branch $BRANCH_NAME that already exists."
  git branch -D $BRANCH_NAME
fi

# Work on the new branch
git checkout -b $BRANCH_NAME

# Build the package as normal
export DMTASK='preparing'
npm run build
unset DMTASK

echo "✍️ Commiting changed package"
git add package/ --force

git commit -m "Release Digital Marketplace GOV.UK Frontend to '$BRANCH_NAME' for testing"

# Create a local branch containing the package directory
echo "✨ Filter the branch to only the package/ directory..."
git filter-branch --force --subdirectory-filter package

# Force the push of the branch to the remote Github origin
git push origin $BRANCH_NAME:$BRANCH_NAME --force

echo "⚠️ Branch pushed to '$BRANCH_NAME', do not edit this by hand."

git checkout -

BRANCH_COMMIT_SHA=$(git rev-parse --short $BRANCH_NAME)

echo
echo "✅ To install the pushed branch release run 'npm install --save alphagov/digitalmarketplace-govuk-frontend#$BRANCH_COMMIT_SHA'"
