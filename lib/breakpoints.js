var debounce = require('lodash.debounce');
var utils = require('./utils');

var breakpoints = [];
var breakpointsToIndexMap = {};
var indexToBreakpointsMap = {};
var listeners = {};
var currentBreakpoint;

function handleResize(evt) {
  var nextBreakpoint = getBreakpointIndex(utils.readPseudo('before'));
  var triggerableListeners = listeners[nextBreakpoint];

  if (nextBreakpoint !== currentBreakpoint) {
    currentBreakpoint = nextBreakpoint;

    for (var i = 0, l = triggerableListeners.length; i < l; i++) {
      if (triggerableListeners[i].nextTick) {
        utils.fire(triggerableListeners[i].fn, evt);
      }
      else {
        triggerableListeners[i].fn(evt);
      }
    }
  }
}

function listen() {
  window.addEventListener('resize', debounce(handleResize, 200));
}

function addListener(index, fn, nextTick) {
  listeners[index] && listeners[index].push({fn: fn, nextTick: nextTick});
}

function setupListenersAndBreakpointsMap() {
  for (var i = 0, l = breakpoints.length; i < l; i++) {
    breakpointsToIndexMap[breakpoints[i]] = i;
    indexToBreakpointsMap[i] = breakpoints[i];
    listeners[i] = [];
  }
}

function getBreakpointIndex(breakpoint) {
  return breakpointsToIndexMap[breakpoint];
}

function readIn() {
  breakpoints = utils.readPseudo('after').split(',');
  setupListenersAndBreakpointsMap();
  currentBreakpoint = getBreakpointIndex(utils.readPseudo('before'));
}

function currentBreakpoint() {
  return indexToBreakpointsMap[currentBreakpoint];
}

function currentBreakpointIndex() {
  return currentBreakpoint;
}

function totalBreakpoints() {
  return breakpoints.length;
}

module.exports.readIn = readIn;
module.exports.getBreakpointIndex = getBreakpointIndex;
module.exports.addListener = addListener;
module.exports.currentBreakpoint = currentBreakpoint;
module.exports.currentBreakpointIndex = currentBreakpointIndex;
module.exports.totalBreakpoints = totalBreakpoints;
module.exports.listen = listen;
