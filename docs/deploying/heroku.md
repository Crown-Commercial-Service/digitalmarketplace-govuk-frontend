# Deploying the review app to Heroku

A version of the review app for this repo is hosted on [Heroku] at https://dmp-govuk-frontend-review.herokuapp.com.

To push a new version you'll need to add Heroku as a git remote

    git remote add heroku https://git.heroku.com/dmp-govuk-frontend-review.git

Then you can use git to push your changes

    git push heroku master:your-branch-name

## Troubleshooting

If the push/deploy is successful but Heroku has errors running the app make sure [pruning of devDependencies][1] is disabled

    heroku config:set NPM_CONFIG_PRODUCTION=false

[1]: https://devcenter.heroku.com/articles/nodejs-support#skip-pruning

[Heroku]: heroku.com
