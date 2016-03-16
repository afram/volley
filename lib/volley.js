var utils = require('./utils');
var bps = require('./breakpoints');
var isDev = require('./is-dev');
var triggers = require('./triggers');

function getCurrentBreakpoint() {
  return bps.currentBreakpoint();
}

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


module.exports.getCurrentBreakpoint = getCurrentBreakpoint;
