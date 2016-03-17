var utils = require('./utils');
var bps = require('./breakpoints');
var isDev = require('./is-dev');
var triggers = require('./triggers');
var comparators = require('./comparators');

function init() {
  bps.readIn();
  bps.listen();
}

if (utils.isBrowser() && utils.isSupported()) {
  init();
}

module.exports.at = function() {
  if (isDev) {
    console.log('[volley] volley.at is deprecated, use volley.triggerAt');
  }
  triggers.triggerAt.apply(this, arguments);
};
module.exports.triggerAt = triggers.triggerAt;

module.exports.below = function() {
  if (isDev) {
    console.log('[volley] volley.below is deprecated, use volley.triggerAtAndBelow');
  }
  triggers.triggerAtAndBelow.apply(this, arguments);
};
module.exports.triggerAtAndBelow = triggers.triggerAtAndBelow;


module.exports.above = function() {
  if (isDev) {
    console.log('[volley] volley.above is deprecated, use volley.triggerAtAndAbove');
  }
  triggers.triggerAtAndAbove.apply(this, arguments);
};
module.exports.triggerAtAndAbove = triggers.triggerAtAndAbove;


module.exports.between = function() {
  if (isDev) {
    console.log('[volley] volley.between is deprecated, use volley.triggerAtAndBetween');
  }
  triggers.triggerAtAndBetween.apply(this, arguments);
};
module.exports.triggerAtAndBetween = triggers.triggerAtAndBetween;

module.exports.getCurrentBreakpoint = comparators.getCurrentBreakpoint;

module.exports.isGreaterThan = comparators.isGreaterThan;
module.exports.isGreaterThanOrEqual = comparators.isGreaterThanOrEqual;
module.exports.isLessThan = comparators.isLessThan;
module.exports.isLessThanOrEqual = comparators.isLessThanOrEqual;
module.exports.isEqual = comparators.isEqual;