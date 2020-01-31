# Cookie Settings page

This component includes Javascript only, for use the User Frontend Cookie Settings page.

## Functionality
On page load:
- adds an event listener to the Cookie Settings form to handle any submit actions
- checks for any existing `dm_cookies_policy` cookie
- populates the Cookie Settings form with the user's existing preferences (if cookie has been set)
- displays a warning message if the user has not set any analytics preferences
- hides the Cookie Banner component if present (to avoid confusion for the user)

On submitting the form:
- sets a `dm_cookies_policy` cookie containing the user's analytics preferences (true or false)
- displays a confirmation message
- displays an error message if the user submitted an empty form
- (if user chooses to accept analytics) initialises Google Analytics cookies and sends an initial TrackPageview event
- (if user chooses to reject analytics) disables Google Analytics and deletes any existing Google Analytics cookies,
via the `setConsentCookie` helper function


## Installation
Install by including the following line in the app's `application.js`:

```
DMGOVUKFrontend.initAll()
```
