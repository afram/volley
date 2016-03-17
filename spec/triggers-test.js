var volley = require('../lib/volley');
var helpers = require('./helpers');
var fn;

function checkIsCalled(done) {
  setTimeout(function() {
    expect(fn.listener).toHaveBeenCalled();
    done();
  }, 0);
}

function checkNotCalled(done) {
  setTimeout(function() {
    expect(fn.listener).not.toHaveBeenCalled();
    done();
  }, 0);
}

describe('triggers', function() {
  beforeEach(function(done) {
    fn = jasmine.createSpyObj('fn', ['listener']);
    helpers.resetTestEnv('medium', done);
  });

  it('should get current breakpoint value', function() {
    var currentBreakpoint = volley.getCurrentBreakpoint();
    expect(currentBreakpoint).toEqual('medium');
  });

  describe('triggerAt', function() {
    it('should not trigger on setting if not matching breakpoint', function(done) {
      volley.triggerAt('extralarge', fn.listener);
      checkNotCalled(done);
    });

    it('should not trigger if optional second arg fireOnSet is false', function(done) {
      volley.triggerAt('medium', {fireOnSet: false}, fn.listener);
      checkNotCalled(done);
    });

    it('should trigger if optional second arg fireOnSet is not set', function(done) {
      volley.triggerAt('medium', fn.listener);
      checkIsCalled(done);
    });

    it('should trigger if optional second arg fireOnSet is set to true', function(done) {
      volley.triggerAt('medium', {fireOnSet: true}, fn.listener);
      checkIsCalled(done);
    });

    it('should not trigger if breakpoint does not exist', function(done) {
      volley.triggerAt('noexist', fn.listener);
      checkNotCalled(done);
    });

    it('should trigger immediately if nextTick is disabled', function() {
      volley.triggerAt('medium', {nextTick: false}, fn.listener);
      expect(fn.listener).toHaveBeenCalled();
    });

    it('should trigger at next tick if a config object is passed, but nextTick is omitted', function(done) {
      volley.triggerAt('medium', {fireOnSet: true}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      checkIsCalled(done)
    });

    it('should trigger using the deprecated method', function() {
      volley.at('medium', {nextTick: false}, fn.listener);
      expect(fn.listener).toHaveBeenCalled();
    });
  });

  describe('triggerAtAndBelow', function() {
    it('should not trigger on setting if not matching breakpoint', function(done) {
      volley.triggerAtAndBelow('small', fn.listener);
      checkNotCalled(done);
    });

    it('should not trigger if optional second arg fireOnSet is false', function(done) {
      volley.triggerAtAndBelow('medium', {fireOnSet: false}, fn.listener);
      checkNotCalled(done);
    });

    it('should trigger if optional second arg fireOnSet is not set', function(done) {
      volley.triggerAtAndBelow('medium', fn.listener);
      checkIsCalled(done);
    });

    it('should trigger if optional second arg fireOnSet is set to true', function(done) {
      volley.triggerAtAndBelow('large', {fireOnSet: true}, fn.listener);
      checkIsCalled(done);
    });

    it('should not trigger if breakpoint does not exist', function(done) {
      volley.triggerAtAndBelow('noexist', fn.listener);
      checkNotCalled(done);
    });

    it('should trigger immediately if nextTick is disabled', function() {
      volley.triggerAtAndBelow('medium', {nextTick: false}, fn.listener);
      expect(fn.listener).toHaveBeenCalled();
    });

    it('should trigger at next tick if a config object is passed, but nextTick is omitted', function(done) {
      volley.triggerAtAndBelow('medium', {fireOnSet: true}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      checkIsCalled(done)
    });

    it('should trigger using deprecated method', function() {
      volley.triggerAtAndBelow('medium', {nextTick: false}, fn.listener);
      expect(fn.listener).toHaveBeenCalled();
    });
  });

  describe('triggerAtAndAbove', function() {
    it('should not trigger on setting if not matching breakpoint', function(done) {
      volley.triggerAtAndAbove('large', fn.listener);
      checkNotCalled(done);
    });

    it('should not trigger if optional second arg fireOnSet is false', function(done) {
      volley.triggerAtAndAbove('medium', {fireOnSet: false}, fn.listener);
      checkNotCalled(done);
    });

    it('should trigger if optional second arg fireOnSet is not set', function(done) {
      volley.triggerAtAndAbove('small', fn.listener);
      checkIsCalled(done);
    });

    it('should trigger if optional second arg fireOnSet is set to true', function(done) {
      volley.triggerAtAndAbove('extrasmall', {fireOnSet: true}, fn.listener);
      checkIsCalled(done);
    });

    it('should not trigger if breakpoint does not exist', function(done) {
      volley.triggerAtAndAbove('noexist', fn.listener);
      checkNotCalled(done);
    });

    it('should trigger immediately if nextTick is disabled', function() {
      volley.triggerAtAndAbove('medium', {nextTick: false}, fn.listener);
      expect(fn.listener).toHaveBeenCalled();
    });

    it('should trigger at next tick if a config object is passed, but nextTick is omitted', function(done) {
      volley.triggerAtAndAbove('medium', {fireOnSet: true}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      checkIsCalled(done)
    });

    it('should trigger using deprecated method', function() {
      volley.triggerAtAndAbove('medium', {nextTick: false}, fn.listener);
      expect(fn.listener).toHaveBeenCalled();
    });
  });

  describe('triggerAtAndBetween', function() {
    it('should not trigger on setting if not matching breakpoint', function(done) {
      volley.triggerAtAndBetween('large', 'extralarge', fn.listener);
      checkNotCalled(done);
    });

    it('should not trigger if optional third arg fireOnSet is false', function(done) {
      volley.triggerAtAndBetween('medium', 'extralarge', {fireOnSet: false}, fn.listener);
      checkNotCalled(done);
    });

    it('should trigger if optional third arg fireOnSet is not set', function(done) {
      volley.triggerAtAndBetween('medium', 'extralarge', fn.listener);
      checkIsCalled(done);
    });

    it('should trigger if optional third arg fireOnSet is set to true', function(done) {
      volley.triggerAtAndBetween('extrasmall', 'extralarge', {fireOnSet: true}, fn.listener);
      checkIsCalled(done);
    });

    it('should not trigger if first breakpoint does not exist', function(done) {
      volley.triggerAtAndBetween('noexist', 'medium', fn.listener);
      checkNotCalled(done);
    });

    it('should not trigger if second breakpoint does not exist', function(done) {
      volley.triggerAtAndBetween('medium', 'noexist', fn.listener);
      checkNotCalled(done);
    });

    it('should not trigger if either breakpoint does not exist', function(done) {
      volley.triggerAtAndBetween('foo', 'noexist', fn.listener);
      checkNotCalled(done);
    });

    it('should trigger immediately if nextTick is disabled', function() {
      volley.triggerAtAndBetween('medium', 'large', {nextTick: false}, fn.listener);
      expect(fn.listener).toHaveBeenCalled();
    });

    it('should trigger at next tick if a config object is passed, but nextTick is omitted', function(done) {
      volley.triggerAtAndBetween('medium', 'large', {fireOnSet: true}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      checkIsCalled(done)
    });

    it('should trigger using deprecated method', function() {
      volley.between('medium', 'large', {nextTick: false}, fn.listener);
      expect(fn.listener).toHaveBeenCalled();
    });
  });
});
