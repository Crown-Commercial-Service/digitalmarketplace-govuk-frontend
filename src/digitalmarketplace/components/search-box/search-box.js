function SearchBox ($module) {
  this.$module = $module
  this.toggleTarget = this.$module.querySelector('.js-class-toggle')
}

SearchBox.prototype.init = function () {
  // Check for module
  if (!this.$module) {
    return
  }
  this.$module.addFocusClass = this.addFocusClass.bind(this)
  this.$module.removeFocusClassFromEmptyInput = this.removeFocusClassFromEmptyInput.bind(this)

  if (!this.inputIsEmpty()) {
    this.addFocusClass()
  }

  this.toggleTarget.addEventListener('focus', this.$module.addFocusClass)
  this.toggleTarget.addEventListener('blur', this.$module.removeFocusClassFromEmptyInput)
}

SearchBox.prototype.inputIsEmpty = function () {
  return this.toggleTarget.value === ''
}

SearchBox.prototype.addFocusClass = function () {
  this.toggleTarget.classList.add('focus')
}

SearchBox.prototype.removeFocusClassFromEmptyInput = function () {
  if (this.inputIsEmpty()) {
    this.toggleTarget.classList.remove('focus')
  }
}

export default SearchBox
