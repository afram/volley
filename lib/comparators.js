var bps = require('./breakpoints');

function isGreaterThan(bp) {
  return bps.getCurrentBreakpointIndex() > bps.indexOf(bp);
}

function isGreaterThanOrEqual(bp) {
  return bps.getCurrentBreakpointIndex() >= bps.indexOf(bp);
}

function isLessThan(bp) {
  return bps.getCurrentBreakpointIndex() < bps.indexOf(bp);
}

function isLessThanOrEqual(bp) {
  return bps.getCurrentBreakpointIndex() <= bps.indexOf(bp);
}

function isEqual(bp) {
  return bps.getCurrentBreakpointIndex() === bps.indexOf(bp);
}



module.exports.getCurrentBreakpoint = bps.getCurrentBreakpoint;
module.exports.isGreaterThan = isGreaterThan;
module.exports.isGreaterThanOrEqual = isGreaterThanOrEqual;
module.exports.isLessThan = isLessThan;
module.exports.isLessThanOrEqual = isLessThanOrEqual;
module.exports.isEqual = isEqual;