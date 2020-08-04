var getSibling = function (direction, elem, selector) {
  // Get the next sibling element
  var sibling = (direction === 'next') ? elem.nextElementSibling : elem.previousElementSibling

  // If there's no selector, return the first sibling
  if (!selector) return sibling

  // If the sibling matches our selector, use it
  // If not, jump to the next sibling and continue the loop

  // For IE10,11 (Polyfill for matches)
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
                                Element.prototype.webkitMatchesSelector
  }
  while (sibling) {
    if (sibling.matches(selector)) return sibling
    sibling = (direction === 'next') ? sibling.nextElementSibling : sibling = sibling.previousElementSibling
  }
}

function ListInput ($module) {
  this.$module = $module
  this.$allVisibleItems = $module.querySelectorAll('.dm-list-input__item--visible')
  this.$addAnotherButton = $module.querySelector('.dm-list-input__item-add')
  this.$allItems = $module.querySelectorAll('.dm-list-input__item')
  this.visibleItems = 0

  this.itemContainerClass = 'dm-list-input__item-container'
  this.hiddenItemClass = 'dm-list-input__item--hidden'
  this.visibleItemClass = 'dm-list-input__item--visible'
  this.itemInputClass = 'dm-list-input__item-input'
  this.itemErrorClass = 'dm-list-input__item--error'
  this.itemErrorMsgClass = 'dm-list-input-error-message'
  this.itemCounterClass = 'dm-list-input__counter'
  this.inputErrorClass = 'govuk-input--error'
  this.removeButtonClass = 'dm-list-input__item-remove'
  this.hiddenRemoveButtonClass = 'dm-list-input__item-remove--hidden'

  this.formGroupErrorClass = 'govuk-form-group--error'
  this.hiddenAddButtonClass = 'dm-list-input__item-add--hidden'
  this.addButtonRemainingClass = 'dm-list-input__js-remaining-counter'
}

ListInput.prototype.init = function () {
  // Check for module
  if (!this.$module) {
    return
  }

  this.hideEmptyItems()
  this.updateAllCounters()
  this.bindRemoveClickEvent()
  this.toggleAddAnotherButton()
  this.bindAddClickEvent()
}

// Hide all items that do not have a value (except for the first one, or the first two if no items have a value)
ListInput.prototype.hideEmptyItems = function () {
  var numberOfVisibleEmptyItems = 0
  var numberOfFilledInItems = 0
  this.$allItems.forEach(function ($item) {
    var $input = $item.querySelector('.' + this.itemInputClass)
    var $removeButton = $item.querySelector('.' + this.removeButtonClass)

    if ($input.value === '') {
      if (numberOfVisibleEmptyItems === 0) {
        $removeButton.classList.remove(this.hiddenRemoveButtonClass)
      } else if (numberOfVisibleEmptyItems === 1 && numberOfFilledInItems === 0) {
        $removeButton.classList.remove(this.hiddenRemoveButtonClass)
      } else {
        $item.classList.add(this.hiddenItemClass)
        $item.classList.remove(this.visibleItemClass)
        $removeButton.classList.add(this.hiddenRemoveButtonClass)
        $input.setAttribute('disabled', 'true')
      }
      numberOfVisibleEmptyItems += 1
    } else {
      $item.classList.remove(this.hiddenItemClass)
      $item.classList.add(this.visibleItemClass)
      $removeButton.classList.remove(this.hiddenRemoveButtonClass)
      numberOfFilledInItems += 1
    }
  }, this)
  this.$allVisibleItems = this.$module.querySelectorAll('.' + this.visibleItemClass)
}

// Binds an event listener to module to listen for any
// click events fired by the items "Remove" button
ListInput.prototype.bindRemoveClickEvent = function () {
  this.$module.addEventListener('click', function (event) {
    var $clickedEl = event.target
    if ($clickedEl.tagName === 'BUTTON' && $clickedEl.classList.contains(this.removeButtonClass)) {
      var $item = $clickedEl.parentNode.parentNode
      // Remove the input's content and remove its value attribute
      var $input = $item.querySelector('.' + this.itemInputClass)
      $input.value = ''
      $input.removeAttribute('value')
      $input.setAttribute('disabled', 'true')
      $clickedEl.classList.add(this.hiddenRemoveButtonClass)
      $item.classList.add(this.hiddenItemClass)
      $item.classList.remove(this.visibleItemClass)
      this.$allVisibleItems = this.$module.querySelectorAll('.' + this.visibleItemClass)

      // Remove Error messages and styling
      if ($item.classList.contains(this.itemErrorClass)) {
        $item.classList.remove(this.itemErrorClass)
        var $errorFormGroup = $item.querySelector('.' + this.formGroupErrorClass)
        $errorFormGroup.classList.remove(this.formGroupErrorClass)
        $errorFormGroup.querySelector('.' + this.itemErrorMsgClass).remove()
        var $errorInput = $errorFormGroup.querySelector('.' + this.inputErrorClass)
        var inputId = $errorInput.getAttribute('id')
        var inputDescribedBy = $errorInput.getAttribute('aria-describedby')
        $errorInput.setAttribute('aria-describedby', inputDescribedBy.replace(inputId + '-error', ''))
        $errorInput.classList.remove(this.inputErrorClass)
      }

      // Hide Remove buttons if there is only one item left
      if (this.$allVisibleItems.length === 1) {
        var $removeButtons = this.$module.querySelectorAll('.' + this.removeButtonClass)
        $removeButtons.forEach(function ($button) {
          $button.classList.add(this.hiddenRemoveButtonClass)
        }, this)
        this.$allVisibleItems[0].querySelector('input').focus()
      } else {
        // Set focus to the next input
        var $nextVisibleItem = getSibling('next', $item, '.' + this.visibleItemClass)

        if ($nextVisibleItem) {
          $nextVisibleItem.querySelector('input').focus()
        } else {
          var $previousVisibleItem = getSibling('previous', $item, '.' + this.visibleItemClass)
          $previousVisibleItem.querySelector('input').focus()
        }
      }

      this.updateAllCounters()
      this.toggleAddAnotherButton()
    }
  }.bind(this))
}

// Used to update each item's label and remove button hidden text
ListInput.prototype.updateCounters = function () {
  var $visibleItems = this.$allVisibleItems
  var counter = 1
  $visibleItems.forEach(function (item) {
    var $counters = item.querySelectorAll('.' + this.itemCounterClass)
    $counters.forEach(function ($counter) {
      $counter.innerHTML = counter
    })
    counter += 1
  }, this)
}

// Used to update "Add another" buttons "Remaining" counter
// and sets focus to the new additional input
ListInput.prototype.updateRemainingCounter = function () {
  var $visibleItems = this.$allVisibleItems
  var totalItems = this.$allItems.length

  this.$module.querySelector('.' + this.addButtonRemainingClass).innerHTML = totalItems - $visibleItems.length
}

ListInput.prototype.bindAddClickEvent = function () {
  this.$addAnotherButton.addEventListener('click', function () {
    // Find the first hidden item
    var $firstHiddenItem = this.$module.querySelector('.' + this.hiddenItemClass)
    var $firstHiddenInput = $firstHiddenItem.querySelector('.' + this.itemInputClass)

    if ($firstHiddenItem) {
      $firstHiddenInput.removeAttribute('disabled')
      this.$module.querySelector('.' + this.itemContainerClass).appendChild($firstHiddenItem)
      $firstHiddenItem.classList.remove(this.hiddenItemClass)
      $firstHiddenItem.classList.add(this.visibleItemClass)
      this.$allVisibleItems = this.$module.querySelectorAll('.' + this.visibleItemClass)
      this.updateAllCounters()
      $firstHiddenItem.querySelector('.' + this.removeButtonClass).classList.remove(this.hiddenRemoveButtonClass)
      $firstHiddenInput.focus()
      this.toggleAddAnotherButton()

      // Show Remove buttons if there is more one item
      if (this.$allVisibleItems.length > 1) {
        var $removeButtons = this.$module.querySelectorAll('.' + this.removeButtonClass)
        $removeButtons.forEach(function ($button) {
          $button.classList.remove(this.hiddenRemoveButtonClass)
        }, this)
      }
    }
  }.bind(this))
}

ListInput.prototype.toggleAddAnotherButton = function () {
  var $firstHiddenItem = this.$module.querySelector('.' + this.hiddenItemClass)

  if ($firstHiddenItem) {
    this.$addAnotherButton.classList.remove(this.hiddenAddButtonClass)
  } else {
    this.$addAnotherButton.classList.add(this.hiddenAddButtonClass)
  }
}

ListInput.prototype.updateAllCounters = function () {
  this.updateCounters()
  this.updateRemainingCounter()
}

export default ListInput
