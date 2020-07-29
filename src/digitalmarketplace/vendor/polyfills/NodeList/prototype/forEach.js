(function(undefined) {

  // Detection from https://raw.githubusercontent.com/Financial-Times/polyfill-library/master/polyfills/NodeList/prototype/forEach/detect.js
  var detect = (
    'forEach' in NodeList.prototype
  );

  if (detect) return

  // Polyfill from https://raw.githubusercontent.com/Financial-Times/polyfill-service/1f3c09b402f65bf6e393f933a15ba63f1b86ef1f/packages/polyfill-library/polyfills/Element/prototype/matches/polyfill.js
  NodeList.prototype.forEach = Array.prototype.forEach;

}).call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});
