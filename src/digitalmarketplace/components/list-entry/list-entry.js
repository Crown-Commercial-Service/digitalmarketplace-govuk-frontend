import { nodeListForEach } from '../../common'

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

  this.hideItems()
  this.updateRemainingCounter()

  this.bindRemoveClickEvent()

  this.toggleAddAnotherButton()
  this.bindAddClickEvent()
}

ListEntry.prototype.hideItems = function () {
  var $visibleItems = 0
  nodeListForEach(this.$allItems, function ($item) {
    var $input = $item.querySelector('.dm-list-entry__item-input')
    var $removeButton = $item.querySelector('.dm-list-entry__item-remove')

    if ($input.value === '') {
      if ($visibleItems >= 1) {
        $item.classList.add('dm-list-entry__item--hidden')
        $removeButton.classList.add('dm-list-entry__item-remove--hidden')
      } else {
        $removeButton.classList.remove('dm-list-entry__item-remove--hidden')
      }
      $visibleItems += 1
    } else {
      $item.classList.remove('dm-list-entry__item--hidden')
      $removeButton.classList.remove('dm-list-entry__item-remove--hidden')
    }
  })
  this.$allVisibleItems = this.$module.querySelectorAll('.dm-list-entry__item:not(.dm-list-entry__item--hidden)')
}

ListEntry.prototype.bindRemoveClickEvent = function () {
  this.$module.addEventListener('click', function (event) {
    var $clickedEl = event.target
    if ($clickedEl.tagName === 'BUTTON' && $clickedEl.classList.contains('dm-list-entry__item-remove')) {
      var $item = $clickedEl.parentNode
      $item.querySelector('input').value = ''
      $clickedEl.classList.add('dm-list-entry__item-remove--hidden')
      $item.classList.add('dm-list-entry__item--hidden')
      this.$allVisibleItems = this.$module.querySelectorAll('.dm-list-entry__item:not(.dm-list-entry__item--hidden)')

      // Hide Remove buttons if there are only one item left
      if (this.$allVisibleItems.length === 1) {
        var $removeButtons = this.$module.querySelectorAll('.dm-list-entry__item-remove')
        nodeListForEach($removeButtons, function ($button) {
          $button.classList.add('dm-list-entry__item-remove--hidden')
        })
      }

      this.updateCounters()
      this.toggleAddAnotherButton()
    }
  }.bind(this))
}

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
  this.updateRemainingCounter()
}

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
      this.updateCounters()
      this.updateRemainingCounter()
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

export default ListEntry
