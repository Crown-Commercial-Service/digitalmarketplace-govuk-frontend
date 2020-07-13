import { nodeListForEach } from '../../common'

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

function ListEntry ($module) {
  this.$module = $module
  this.$allVisibleItems = $module.querySelectorAll('.dm-list-entry__item:not(.dm-list-entry__item--hidden)')
  this.$addAnotherButton = $module.querySelector('.dmp-list-entry__item-add')
  this.$allItems = $module.querySelectorAll('.dm-list-entry__item')
  this.visibleItems = 0
}

ListEntry.prototype.init = function () {
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

// Hide all items that do not have a value (except for the first one)
ListEntry.prototype.hideEmptyItems = function () {
  var numberOfVisibleEmptyItems = 0
  nodeListForEach(this.$allItems, function ($item) {
    var $input = $item.querySelector('.dm-list-entry__item-input')
    var $removeButton = $item.querySelector('.dm-list-entry__item-remove')

    if ($input.value === '') {
      if (numberOfVisibleEmptyItems >= 1) {
        $item.classList.add('dm-list-entry__item--hidden')
        $removeButton.classList.add('dm-list-entry__item-remove--hidden')
      } else {
        $removeButton.classList.remove('dm-list-entry__item-remove--hidden')
      }
      numberOfVisibleEmptyItems += 1
    } else {
      $item.classList.remove('dm-list-entry__item--hidden')
      $removeButton.classList.remove('dm-list-entry__item-remove--hidden')
    }
  })
  this.$allVisibleItems = this.$module.querySelectorAll('.dm-list-entry__item:not(.dm-list-entry__item--hidden)')
}

// Binds an event listener to module to listen for any
// click events fired by the items "Remove" button
ListEntry.prototype.bindRemoveClickEvent = function () {
  this.$module.addEventListener('click', function (event) {
    var $clickedEl = event.target
    if ($clickedEl.tagName === 'BUTTON' && $clickedEl.classList.contains('dm-list-entry__item-remove')) {
      var $item = $clickedEl.parentNode
      $item.querySelector('input').value = ''
      $clickedEl.classList.add('dm-list-entry__item-remove--hidden')
      $item.classList.add('dm-list-entry__item--hidden')
      this.$allVisibleItems = this.$module.querySelectorAll('.dm-list-entry__item:not(.dm-list-entry__item--hidden)')

      // Remove Error messages and styling
      var $errorContainer = $item

      if ($errorContainer.classList.contains('govuk-form-group--error')) {
        $errorContainer.classList.remove('govuk-form-group--error')
        $errorContainer.classList.remove('dm-list-entry__item--error')
        $errorContainer.querySelector('.govuk-error-message').remove()
        $errorContainer.querySelector('.govuk-input--error').classList.remove('govuk-input--error')
      }

      // Hide Remove buttons if there are only one item left
      if (this.$allVisibleItems.length === 1) {
        var $removeButtons = this.$module.querySelectorAll('.dm-list-entry__item-remove')
        nodeListForEach($removeButtons, function ($button) {
          $button.classList.add('dm-list-entry__item-remove--hidden')
        })
        this.$allVisibleItems[0].querySelector('input').focus()
      } else {
        // Set focus to the next input
        var $nextVisibleItem = getSibling('next', $item, '.dm-list-entry__item:not(.dm-list-entry__item--hidden)')

        if ($nextVisibleItem) {
          $nextVisibleItem.querySelector('input').focus()
        } else {
          var $previousVisibleItem = getSibling('previous', $item, '.dm-list-entry__item:not(.dm-list-entry__item--hidden)')
          $previousVisibleItem.querySelector('input').focus()
        }
      }

      this.updateAllCounters()
      this.toggleAddAnotherButton()
    }
  }.bind(this))
}

// Used to update each item's label and remove button hidden text
ListEntry.prototype.updateCounters = function () {
  var $visibleItems = this.$allVisibleItems
  var counter = 1
  nodeListForEach($visibleItems, function (item) {
    var $counters = item.querySelectorAll('.dm-list-entry__counter')
    nodeListForEach($counters, function ($counter) {
      $counter.innerHTML = counter
    })
    counter += 1
  })
}

// Used to update "Add another" buttons "Remaining" counter
// and sets focus to the new additional input
ListEntry.prototype.updateRemainingCounter = function () {
  var $visibleItems = this.$allVisibleItems
  var totalItems = this.$allItems.length

  this.$module.querySelector('.dm-list-entry__js-remaining-counter').innerHTML = totalItems - $visibleItems.length
}

ListEntry.prototype.bindAddClickEvent = function () {
  this.$addAnotherButton.addEventListener('click', function () {
    // Find the first hidden item
    var $firstHiddenItem = this.$module.querySelector('.dm-list-entry__item.dm-list-entry__item--hidden')

    if ($firstHiddenItem) {
      this.$module.querySelector('.dm-list-entry__item-container').appendChild($firstHiddenItem)
      $firstHiddenItem.classList.remove('dm-list-entry__item--hidden')
      this.$allVisibleItems = this.$module.querySelectorAll('.dm-list-entry__item:not(.dm-list-entry__item--hidden)')
      this.updateAllCounters()
      $firstHiddenItem.querySelector('.dm-list-entry__item-remove').classList.remove('dm-list-entry__item-remove--hidden')
      $firstHiddenItem.querySelector('input').focus()
      this.toggleAddAnotherButton()

      // Show Remove buttons if there is more one item
      if (this.$allVisibleItems.length > 1) {
        var $removeButtons = this.$module.querySelectorAll('.dm-list-entry__item-remove')
        nodeListForEach($removeButtons, function ($button) {
          $button.classList.remove('dm-list-entry__item-remove--hidden')
        })
      }
    }
  }.bind(this))
}

ListEntry.prototype.toggleAddAnotherButton = function () {
  var $hiddenItems = this.$module.querySelector('.dm-list-entry__item--hidden')

  if ($hiddenItems) {
    this.$addAnotherButton.classList.remove('dmp-list-entry__item-add--hidden')
  } else {
    this.$addAnotherButton.classList.add('dmp-list-entry__item-add--hidden')
  }
}

ListEntry.prototype.updateAllCounters = function () {
  this.updateCounters()
  this.updateRemainingCounter()
}
export default ListEntry
