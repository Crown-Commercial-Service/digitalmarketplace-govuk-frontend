function Expander ($module) {
  this.$module = $module
  this.$toggle = this.$module.querySelector('.js-toggle')
  this.$content = this.$module.querySelector('.js-content')
  this.selectedElements = []
}

/*
 * This JavaScript provides open/closing of the content, as well as
 * an input selection counter
 */

Expander.prototype.init = function () {
  var openOnLoad = this.$module.dataset.openOnLoad === 'true'
  this.replaceHeadingSpanWithButton(openOnLoad)

  this.$module.toggleContent = this.toggleContent.bind(this)
  this.$toggleButton = this.$module.querySelector('.js-button')
  this.$toggleButton.addEventListener('click', this.$module.toggleContent)
}

/**
 * Handle collapsing and expanding
 */

Expander.prototype.replaceHeadingSpanWithButton = function (expanded) {
  var toggleHtml = this.$toggle.innerHTML

  var $button = document.createElement('button')
  $button.classList.add('dm-expander__button')
  $button.classList.add('js-button')
  $button.setAttribute('type', 'button')
  $button.setAttribute('id', 'expander-title-' + this.$content.getAttribute('id'))
  $button.setAttribute('aria-expanded', expanded)
  $button.setAttribute('aria-controls', this.$content.getAttribute('id'))
  $button.innerHTML = toggleHtml

  this.$toggle.parentNode.replaceChild($button, this.$toggle)
}

Expander.prototype.toggleContent = function (e) {
  if (this.$toggleButton.getAttribute('aria-expanded') === 'false') {
    this.$toggleButton.setAttribute('aria-expanded', true)
    this.$content.classList.add('dm-expander__content--visible')
  } else {
    this.$toggleButton.setAttribute('aria-expanded', false)
    this.$content.classList.remove('dm-expander__content--visible')
  }
}

export default Expander
