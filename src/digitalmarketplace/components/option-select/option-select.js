function OptionSelect ($module) {
  this.$optionSelect = $module
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

  // Replace div.container-head with a button
  this.replaceHeadingSpanWithButton()

  // Add js-collapsible class to parent for CSS
  this.$optionSelect.classList.add('js-collapsible')

  // Add open/close listeners
  this.$optionSelect.querySelector('.js-container-button').addEventListener('click', this.toggleOptionSelect.bind(this))
  if (this.$optionSelect.dataset.closedOnLoad === 'true') {
    this.close()
  } else {
    this.setupHeight()
  }

  var checkedString = this.checkedString()
  if (checkedString) {
    this.attachCheckedCounter(checkedString)
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

OptionSelect.prototype.replaceHeadingSpanWithButton = function replaceHeadingSpanWithButton () {
  /* Replace the span within the heading with a button element. This is based on feedback from Léonie Watson.
    * The button has all of the accessibility hooks that are used by screen readers and etc.
    * We do this in the JavaScript because if the JavaScript is not active then the button shouldn't
    * be there as there is no JS to handle the click event.
  */
  var $containerHead = this.$optionSelect.querySelector('.js-container-button')
  var jsContainerHeadHTML = $containerHead.innerHTML

  // Create button and replace the preexisting html with the button.
  var $button = document.createElement('button')
  $button.classList.add('js-container-button', 'dm-option-select__title', 'dm-option-select__button')
  // Add type button to override default type submit when this component is used within a form
  $button.setAttribute('type', 'button')
  $button.setAttribute('aria-expanded', true)
  $button.setAttribute('id', $containerHead.id)
  $button.setAttribute('aria-controls', this.$optionsContainer.id)
  $button.innerHTML = jsContainerHeadHTML
  $containerHead.insertAdjacentHTML('afterend', $button.outerHTML)
  $containerHead.remove()
}

OptionSelect.prototype.attachCheckedCounter = function attachCheckedCounter (checkedString) {
  this.$optionSelect.querySelector('.js-container-button')
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
    checkedStringElement.remove()
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

OptionSelect.prototype.toggleOptionSelect = function toggleOptionSelect (e) {
  if (this.isClosed()) {
    this.open()
  } else {
    this.close()
  }
  e.preventDefault()
}

OptionSelect.prototype.open = function open () {
  if (this.isClosed()) {
    this.$optionSelect.querySelector('.js-container-button').setAttribute('aria-expanded', true)
    this.$optionSelect.classList.remove('js-closed')
    this.$optionSelect.classList.add('js-opened')
    if (!this.$optionsContainer.style.height) {
      this.setupHeight()
    }
  }
}

OptionSelect.prototype.close = function close () {
  this.$optionSelect.classList.remove('js-opened')
  this.$optionSelect.classList.add('js-closed')
  this.$optionSelect.querySelector('.js-container-button').setAttribute('aria-expanded', false)
}

OptionSelect.prototype.isClosed = function isClosed () {
  return this.$optionSelect.classList.contains('js-closed')
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
