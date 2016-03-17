var volley = require('../lib/volley');
var helpers = require('./helpers');

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

describe('orientationchange', function() {
  beforeEach(function(done) {
    fn = jasmine.createSpyObj('fn', ['listener']);
    helpers.resetTestEnv('medium', done);
  });

  describe('triggerAt', function() {
    it('should not have its listeners triggered on orientationchange breakpoint unchanged', function(done) {
      volley.triggerAt('medium', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      helpers.triggerOrientationchangeEvent();
      checkNotCalled(done);
    });

    it('should have its listeners triggered on orientationchange if match', function(done) {
      volley.triggerAt('large', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      helpers.setBreakpoint('large');
      helpers.triggerOrientationchangeEvent();
      checkIsCalled(done);
    });

    it('should not have its listeners triggered on orientationchange if no match', function(done) {
      volley.triggerAt('large', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      helpers.setBreakpoint('small');
      helpers.triggerOrientationchangeEvent();
      checkNotCalled(done);
    });

    it('should pass the event object to the callback function when fired', function(done) {
      volley.triggerAt('large', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      helpers.setBreakpoint('large');
      helpers.triggerOrientationchangeEvent();
      checkIsCalledWithEventObj(done);
    });

    it('should trigger listener using deprecated method', function(done) {
      volley.at('large', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      helpers.setBreakpoint('large');
      helpers.triggerOrientationchangeEvent();
      checkIsCalled(done);
    });
  });

  describe('triggerAtAndBelow', function() {
    it('should not have its listeners triggered on orientationchange breakpoint unchanged', function(done) {
      volley.triggerAtAndBelow('medium', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      helpers.triggerOrientationchangeEvent();
      checkNotCalled(done);
    });

    it('should have its listeners triggered on orientationchange if match', function(done) {
      volley.triggerAtAndBelow('large', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      helpers.setBreakpoint('large');
      helpers.triggerOrientationchangeEvent();
      checkIsCalled(done);
    });

    it('should not have its listeners triggered on orientationchange if no match', function(done) {
      volley.triggerAtAndBelow('large', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      helpers.setBreakpoint('extralarge');
      helpers.triggerOrientationchangeEvent();
      checkNotCalled(done);
    });

    it('should pass the event object to the callback function when fired', function(done) {
      volley.triggerAtAndBelow('large', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      helpers.setBreakpoint('large');
      helpers.triggerOrientationchangeEvent();
      checkIsCalledWithEventObj(done);
    });

    it('should trigger listener using deprecated method', function(done) {
      volley.below('large', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      helpers.setBreakpoint('large');
      helpers.triggerOrientationchangeEvent();
      checkIsCalled(done);
    });
  });

  describe('triggerAtAndAbove', function() {
    it('should not have its listeners triggered on orientationchange breakpoint unchanged', function(done) {
      volley.triggerAtAndAbove('medium', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      helpers.triggerOrientationchangeEvent();
      checkNotCalled(done);
    });

    it('should have its listeners triggered on orientationchange if match', function(done) {
      volley.triggerAtAndAbove('small', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      helpers.setBreakpoint('large');
      helpers.triggerOrientationchangeEvent();
      checkIsCalled(done);
    });

    it('should not have its listeners triggered on orientationchange if no match', function(done) {
      volley.triggerAtAndAbove('large', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      helpers.setBreakpoint('small');
      helpers.triggerOrientationchangeEvent();
      checkNotCalled(done);
    });

    it('should pass the event object to the callback function when fired', function(done) {
      volley.triggerAtAndAbove('small', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      helpers.setBreakpoint('large');
      helpers.triggerOrientationchangeEvent();
      checkIsCalledWithEventObj(done);
    });

    it('should trigger listener using deprecated method', function(done) {
      volley.above('small', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      helpers.setBreakpoint('large');
      helpers.triggerOrientationchangeEvent();
      checkIsCalled(done);
    });
  });

  describe('triggerAtAndBetween', function() {
    it('should not have its listeners triggered on orientationchange breakpoint unchanged', function(done) {
      volley.triggerAtAndBetween('medium', 'medium', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      helpers.triggerOrientationchangeEvent();
      checkNotCalled(done);
    });

    it('should have its listeners triggered on orientationchange if match', function(done) {
      volley.triggerAtAndBetween('small', 'extralarge', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      helpers.setBreakpoint('large');
      helpers.triggerOrientationchangeEvent();
      checkIsCalled(done);
    });

    it('should not have its listeners triggered on orientationchange if no match', function(done) {
      volley.triggerAtAndBetween('medium', 'extralarge', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      helpers.setBreakpoint('small');
      helpers.triggerOrientationchangeEvent();
      checkNotCalled(done);
    });

    it('should pass the event object to the callback function when fired', function(done) {
      volley.triggerAtAndBetween('small', 'extralarge', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      helpers.setBreakpoint('large');
      helpers.triggerOrientationchangeEvent();
      checkIsCalledWithEventObj(done);
    });

    it('should trigger listener using deprecated method', function(done) {
      volley.between('small', 'extralarge', {fireOnSet: false, nextTick: false}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      helpers.setBreakpoint('large');
      helpers.triggerOrientationchangeEvent();
      checkIsCalled(done);
    });
  });
});
