var volley = require('../lib/volley');

var head = document.querySelector('body');
var style = document.createElement('style');
head.appendChild(style);

function setBreakpoint(bp) {
  style.innerHTML = 'body:before{ content: "' + bp + '"; }';
}

function triggerResizeEvent() {
  window.dispatchEvent(new Event('resize'));
}

function resetTestEnv(breakpoint, done) {
  setBreakpoint(breakpoint || 'medium');
  triggerResizeEvent();
  setTimeout(done, 210); // allow change to propagate through
}

module.exports.setBreakpoint = setBreakpoint;
module.exports.triggerResizeEvent = triggerResizeEvent;
module.exports.resetTestEnv = resetTestEnv;