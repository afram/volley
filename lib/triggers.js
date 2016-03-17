var utils = require('./utils');
var bps = require('./breakpoints');

function triggerAt(breakpoint, opts, fn) {
  if (!utils.isSupported()) return;
  if (arguments.length === 2) {
    fn = opts;
    opts = {
      fireOnSet: true,
      nextTick: true
    }
  }

  if (typeof opts.fireOnSet === 'undefined') opts.fireOnSet = true;
  if (typeof opts.nextTick === 'undefined') opts.nextTick = true;

  var bpIndex = bps.getBreakpointIndex(breakpoint);
  bps.addListener(bpIndex, fn, opts.nextTick);

  if (opts.fireOnSet && bpIndex === bps.currentBreakpointIndex()) {
    if (opts.nextTick) {
      utils.fire(fn, null);
    }
    else {
      fn(null);
    }
  }
}

function triggerAtAndBelow(breakpoint, opts, fn) {
  if (!utils.isSupported()) return;
  if (arguments.length === 2) {
    fn = opts;
    opts = {
      fireOnSet: true,
      nextTick: true
    }
  }
  if (typeof opts.fireOnSet === 'undefined') opts.fireOnSet = true;
  if (typeof opts.nextTick === 'undefined') opts.nextTick = true;

  var bpIndex = bps.getBreakpointIndex(breakpoint);

  for (var i = 0; i <= bpIndex; i++) {
    bps.addListener(i, fn, opts.nextTick);
  }

  if (opts.fireOnSet && bps.currentBreakpointIndex() <= bpIndex) {
    if (opts.nextTick) {
      utils.fire(fn, null);
    }
    else {
      fn(null);
    }
  }
}

function triggerAtAndAbove(breakpoint, opts, fn) {
  if (!utils.isSupported()) return;
  if (arguments.length === 2) {
    fn = opts;
    opts = {
      fireOnSet: true,
      nextTick: true
    }
  }
  if (typeof opts.fireOnSet === 'undefined') opts.fireOnSet = true;
  if (typeof opts.nextTick === 'undefined') opts.nextTick = true;

  var bpIndex = bps.getBreakpointIndex(breakpoint);
  var totalBreakpoints = bps.totalBreakpoints();

  for (var i = bpIndex; i <= totalBreakpoints; i++) {
    bps.addListener(i, fn, opts.nextTick);
  }

  if (opts.fireOnSet && bps.currentBreakpointIndex() >= bpIndex) {
    if (opts.nextTick) {
      utils.fire(fn, null);
    }
    else {
      fn(null);
    }
  }
}

function triggerAtAndBetween(breakpoint1, breakpoint2, opts, fn) {
  if (!utils.isSupported()) return;
  if (arguments.length === 3) {
    fn = opts;
    opts = {
      fireOnSet: true,
      nextTick: true
    }
  }
  if (typeof opts.fireOnSet === 'undefined') opts.fireOnSet = true;
  if (typeof opts.nextTick === 'undefined') opts.nextTick = true;

  var index1 = bps.getBreakpointIndex(breakpoint1);
  var index2 = bps.getBreakpointIndex(breakpoint2);

  for(var i = index1; i <= index2; i++) {
    bps.addListener(i, fn, opts.nextTick);
  }

  if (opts.fireOnSet
    && index1 <= bps.currentBreakpointIndex()
    && index2 >= bps.currentBreakpointIndex()) {
    if (opts.nextTick) {
      utils.fire(fn, null);
    }
    else {
      fn(null);
    }
  }
}

module.exports.triggerAt = triggerAt;
module.exports.triggerAtAndBelow = triggerAtAndBelow;
module.exports.triggerAtAndAbove = triggerAtAndAbove;
module.exports.triggerAtAndBetween = triggerAtAndBetween;
