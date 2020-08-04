# Cookie banner component

For use in Digital Marketplace frontend apps. Include the component in the header of the base template
of the app, to ensure it is loaded on every page:

```
{% from "digitalmarketplace/components/cookie-banner/macro.njk" import dmCookieBanner %}
...
{% block header %}
  {{ dmCookieBanner({}) }}
  ...
{% endblock %}
```

## Interaction

The cookie banner is visible by default.

Analytics is disabled by default.

The user can click either 'Yes' or 'No' to set their analytics cookie preferences.

Clicking 'Yes' will::
 - enable analytics
 - trigger an initial PageView event
 - set the analytics consent cookie (to 'true')
 - set a second cookie which will hide the banner for 365 days
 - display a confirmation message

Clicking 'No' will:
 - set the analytics consent cookie (to 'false')
 - set a second cookie which will hide the banner for 365 days
 - display a confirmation message

Once the user has set a preference they will see a confirmation message.
The user can hide this message by clicking the 'Hide' link.
