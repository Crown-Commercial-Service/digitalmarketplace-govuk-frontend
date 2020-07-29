# List Input

## Overview
A List Input is a collection of form inputs. More inputs can be added to the list as needed by
clicking the "add more button". Inputs can be removed from the list by clicking their respective
"remove buttons".

## Options
* `addButtonName`: **Required** _String_. Displayed on the add button as "Add another `addButtonName`
* `classes`: **Optional** _String_. Any additional classes to add to the component wrapper.
* `describedBy`: **Optional** _String_. A record of other elements that we need to associate with the aria-describedby.
* `errorMessage`: **Optional** _Object_. Options for the [GOV.UK error message component](https://github.com/alphagov/govuk-frontend/tree/master/src/govuk/components/error-message). If set, this applies the error message to the entire list-input object. This should be used for list-level errors like "Enter at least one value". For input-specific errors, use `items`.
* `fieldset`: **Required** _Object_. Options for the [GOV.UK fieldset component](https://github.com/alphagov/govuk-frontend/tree/master/src/govuk/components/fieldset) which wraps the inputs.
* `hint`: **Optional** _Object_. Options for the [GOV.UK hint component](https://github.com/alphagov/govuk-frontend/tree/master/src/govuk/components/hint).
* `id`: **Required** _String_. The id of the List Input component.
* `items`: **Optional** _Array_. Each item in the array is a set of options for the [GOV.UK input component](https://github.com/alphagov/govuk-frontend/tree/master/src/govuk/components/input)
* `labelPrefix`: **Optional** _String_. A prefix for input labels. This is visually hidden, allowing extra context for screenreaders. It defaults to `name`.
* `maxItems`: **Required** _Int_. The maximum number of inputs a user can add.
* `name`: **Required** _String_. Used as the name attribute for inputs.
* `optional`: **Optional** _boolean_. Marks the question as optional.
