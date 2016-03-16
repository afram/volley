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

var fn;

function checkIsCalled(done) {
  setTimeout(function() {
    expect(fn.listener).toHaveBeenCalled();
    done();
  }, 210);
}

function checkIsCalledWithEventObj(done) {
  setTimeout(function() {
    expect(fn.listener).toHaveBeenCalledWith(jasmine.any(Event));
    done();
  }, 210);
}

function checkNotCalled(done) {
  setTimeout(function() {
    expect(fn.listener).not.toHaveBeenCalled();
    done();
  }, 210);
}

describe('resize', function() {
  beforeEach(function(done) {
    setBreakpoint('medium');
    triggerResizeEvent();
    setTimeout(done, 210); // allow change to propagate through
    fn = jasmine.createSpyObj('fn', ['listener']);
  });

  describe('at', function() {
    it('should not have its listeners triggered on resize breakpoint unchanged', function(done) {
      volley.at('medium', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      triggerResizeEvent();
      checkNotCalled(done);
    });

    it('should have its listeners triggered on resize if match', function(done) {
      volley.at('large', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      setBreakpoint('large');
      triggerResizeEvent();
      checkIsCalled(done);
    });

    it('should not have its listeners triggered on resize if no match', function(done) {
      volley.at('large', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      setBreakpoint('small');
      triggerResizeEvent();
      checkNotCalled(done);
    });

    it('should pass the event object to the callback function when fired', function(done) {
      volley.at('large', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      setBreakpoint('large');
      triggerResizeEvent();
      checkIsCalledWithEventObj(done);
    });
  });

  describe('below', function() {
    it('should not have its listeners triggered on resize breakpoint unchanged', function(done) {
      volley.below('medium', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      triggerResizeEvent();
      checkNotCalled(done);
    });

    it('should have its listeners triggered on resize if match', function(done) {
      volley.below('large', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      setBreakpoint('large');
      triggerResizeEvent();
      checkIsCalled(done);
    });

    it('should not have its listeners triggered on resize if no match', function(done) {
      volley.below('large', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      setBreakpoint('extralarge');
      triggerResizeEvent();
      checkNotCalled(done);
    });

    it('should pass the event object to the callback function when fired', function(done) {
      volley.below('large', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      setBreakpoint('large');
      triggerResizeEvent();
      checkIsCalledWithEventObj(done);
    });
  });

  describe('above', function() {
    it('should not have its listeners triggered on resize breakpoint unchanged', function(done) {
      volley.above('medium', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      triggerResizeEvent();
      checkNotCalled(done);
    });

    it('should have its listeners triggered on resize if match', function(done) {
      volley.above('small', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      setBreakpoint('large');
      triggerResizeEvent();
      checkIsCalled(done);
    });

    it('should not have its listeners triggered on resize if no match', function(done) {
      volley.above('large', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      setBreakpoint('small');
      triggerResizeEvent();
      checkNotCalled(done);
    });

    it('should pass the event object to the callback function when fired', function(done) {
      volley.above('small', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      setBreakpoint('large');
      triggerResizeEvent();
      checkIsCalledWithEventObj(done);
    });
  });

  describe('between', function() {
    it('should not have its listeners triggered on resize breakpoint unchanged', function(done) {
      volley.between('medium', 'medium', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      triggerResizeEvent();
      checkNotCalled(done);
    });

    it('should have its listeners triggered on resize if match', function(done) {
      volley.between('small', 'extralarge', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      setBreakpoint('large');
      triggerResizeEvent();
      checkIsCalled(done);
    });

    it('should not have its listeners triggered on resize if no match', function(done) {
      volley.between('medium', 'extralarge', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      setBreakpoint('small');
      triggerResizeEvent();
      checkNotCalled(done);
    });

    it('should pass the event object to the callback function when fired', function(done) {
      volley.between('small', 'extralarge', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      setBreakpoint('large');
      triggerResizeEvent();
      checkIsCalledWithEventObj(done);
    });
  });
});
