# List Input

## Overview
A List Input is a collection of form inputs. More inputs can be added to the list as needed by
clicking the "add more button". Inputs can be removed from the list by clicking their respective
"remove buttons".

## Options
* `addButtonName`: **Required** _String_. Displayed on the add button as "Add another `addButtonName`
* `fieldset`: **Required** _Object_. Options for the [GOV.UK fieldset component](https://github.com/alphagov/govuk-frontend/tree/master/src/govuk/components/fieldset) which wraps the inputs.
* `hint`: **Optional** _Object_. Options for the [GOV.UK hint component](https://github.com/alphagov/govuk-frontend/tree/master/src/govuk/components/hint).
* `id`: **Required** _String_. The id of the List Input component.
* `items`: **Optional** _Object_. Individual inputs. Each can have a `value` and an `errorMessage` object.
* `label`: **Required** _Object_. Options for the [GOV.UK label component](https://github.com/alphagov/govuk-frontend/tree/master/src/govuk/components/label).
* `maxItems`: **Required** _Int_. The maximum number of inputs a user can add.
* `name`: **Required** _String_. Used as the name attribute for inputs.
* `optional`: **Optional** _boolean_. Marks the question as optional.

## Questions/Issues/To do

* For an error that's component-level, where does describedby need to point?
* Do we need to display at least two inputs at any given time (even if they're both blank?). This is the behaviour of the current list entry component.

- [ ] Items should conform to govukInput shape (or should they? MVP might be just to handle text inputs as per current implementation?)
- [ ] Make sure all params in template are reflected in README
- [ ] Review test suites
- [ ] Review template
- [ ] Review JS
- [ ] Review CSS
- [ ] Review test suites again
- [ ] Test in-place on frontend app
