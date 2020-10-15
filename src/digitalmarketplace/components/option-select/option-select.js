function OptionSelect ($module) {
  this.$optionSelect = $module
  this.$expander = this.$optionSelect.querySelector('.dm-expander')
  this.$expanderHeading = this.$expander.querySelector('.dm-expander__heading')
  this.$options = this.$optionSelect.querySelectorAll("input[type='checkbox']")
  this.$optionsContainer = this.$optionSelect.querySelector('.js-options-container')
  this.$optionList = this.$optionsContainer.querySelector('.js-auto-height-inner')
  this.$allCheckboxes = this.$optionsContainer.querySelectorAll('.govuk-checkboxes__item')
  this.checkedCheckboxes = []
}

OptionSelect.prototype.init = function () {
  // Attach listener to update checked count
  this.$optionSelect.addEventListener('change', function (event) {
    var $changedEl = event.target
    if ($changedEl.tagName === 'INPUT' && $changedEl.type === 'checkbox') {
      this.updateCheckedCount()
    }
  }.bind(this))

  // Watch Expander button to adjust height if necessary
  this.$expanderHeading.addEventListener('click', function (event) {
    if (this.$expander.querySelector('.dm-expander__content--visible')) {
      this.setupHeight()
    }
  }.bind(this))

  var checkedString = this.checkedString()
  if (checkedString) {
    this.attachCheckedCounter(checkedString)
  }

  if (this.$expander.dataset.openOnLoad === 'true') {
    this.setupHeight()
  }
}

OptionSelect.prototype.getAllCheckedCheckboxes = function getAllCheckedCheckboxes () {
  this.checkedCheckboxes = []
  var that = this

  this.$allCheckboxes.forEach(function (i) {
    if (i.querySelector('input[type=checkbox]').checked) {
      that.checkedCheckboxes.push(i)
    }
  }, this)
}

OptionSelect.prototype.attachCheckedCounter = function attachCheckedCounter (checkedString) {
  this.$optionSelect.querySelector('.js-toggle, .js-button')
    .insertAdjacentHTML('afterend', '<div class="dm-option-select__selected-counter js-selected-counter">' + checkedString + '</div>')
}

OptionSelect.prototype.updateCheckedCount = function updateCheckedCount () {
  var checkedString = this.checkedString()
  var checkedStringElement = this.$optionSelect.querySelector('.js-selected-counter')

  if (checkedString) {
    if (checkedStringElement) {
      checkedStringElement.textContent = checkedString
    } else {
      this.attachCheckedCounter(checkedString)
    }
  } else {
    checkedStringElement.parentNode.removeChild(checkedStringElement)
  }
}

OptionSelect.prototype.checkedString = function checkedString () {
  this.getAllCheckedCheckboxes()
  var count = this.checkedCheckboxes.length
  var checkedString = false
  if (count > 0) {
    checkedString = count + ' selected'
  }

  return checkedString
}

OptionSelect.prototype.setContainerHeight = function setContainerHeight (height) {
  this.$optionsContainer.style.height = height + 'px'
}

OptionSelect.prototype.isCheckboxVisible = function isCheckboxVisible ($checkbox) {
  var initialOptionContainerHeight = this.$optionsContainer.clientHeight
  var optionListOffsetTop = this.$optionList.getBoundingClientRect().top + document.body.scrollTop
  var distanceFromTopOfContainer = ($checkbox.getBoundingClientRect().top + document.body.scrollTop) - optionListOffsetTop
  return distanceFromTopOfContainer < initialOptionContainerHeight
}

OptionSelect.prototype.getVisibleCheckboxes = function getVisibleCheckboxes () {
  var visibleCheckboxes = ([].slice.call(this.$options)).filter(this.isCheckboxVisible.bind(this))
  // add an extra checkbox, if the label of the first is too long it collapses onto itself
  if (visibleCheckboxes.length < this.$options) {
    visibleCheckboxes.push(this.$options[visibleCheckboxes.length])
  }
  return visibleCheckboxes
}

OptionSelect.prototype.setupHeight = function setupHeight () {
  var initialOptionContainerHeight = this.$optionsContainer.clientHeight
  var height = this.$optionList.offsetHeight

  // check whether this is hidden by progressive disclosure,
  // because height calculations won't work
  if (this.$optionsContainer.offsetParent === null) {
    initialOptionContainerHeight = 200
    height = 200
  }

  // Resize if the list is only slightly bigger than its container
  if (height < initialOptionContainerHeight + 50) {
    this.setContainerHeight(height + 1)
    return
  }

  // Resize to cut last item cleanly in half
  var visibleCheckboxes = this.getVisibleCheckboxes()
  var lastVisibleCheckbox = visibleCheckboxes[visibleCheckboxes.length - 1]
  var position = lastVisibleCheckbox.parentNode.offsetTop // parent element is relative
  this.setContainerHeight(position + (parseFloat(window.getComputedStyle(lastVisibleCheckbox, null).height.replace('px', '')) / 1.5))
}

export default OptionSelect
