var utils = require('./utils');
var bps = require('./breakpoints');

function at(breakpoint, opts, fn) {
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
      utils.fire(fn);
    }
    else {
      fn();
    }
  }
}

function below(breakpoint, opts, fn) {
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
      utils.fire(fn);
    }
    else {
      fn();
    }
  }
}

function above(breakpoint, opts, fn) {
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
      utils.fire(fn);
    }
    else {
      fn();
    }
  }
}

function between(breakpoint1, breakpoint2, opts, fn) {
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

module.exports.at = at;
module.exports.below = below;
module.exports.above = above;
module.exports.between = between;
module.exports.getCurrentBreakpoint = getCurrentBreakpoint;
