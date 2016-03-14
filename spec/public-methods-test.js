var volley = require('../lib/volley');
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

describe('public methods', function() {
  beforeEach(function() {
    fn = jasmine.createSpyObj('fn', ['listener']);
  });

  it('should get current breakpoint value', function() {
    var currentBreakpoint = volley.getCurrentBreakpoint();
    expect(currentBreakpoint).toEqual('medium');
  });

  describe('at', function() {
    it('should not trigger on setting if not matching breakpoint', function(done) {
      volley.at('extralarge', fn.listener);
      checkNotCalled(done);
    });

    it('should not trigger if optional second arg fireOnSet is false', function(done) {
      volley.at('medium', {fireOnSet: false}, fn.listener);
      checkNotCalled(done);
    });

    it('should trigger if optional second arg fireOnSet is not set', function(done) {
      volley.at('medium', fn.listener);
      checkIsCalled(done);
    });

    it('should trigger if optional second arg fireOnSet is set to true', function(done) {
      volley.at('medium', {fireOnSet: true}, fn.listener);
      checkIsCalled(done);
    });

    it('should not trigger if breakpoint does not exist', function(done) {
      volley.at('noexist', fn.listener);
      checkNotCalled(done);
    });

    it('should trigger immediately if nextTick is disabled', function() {
      volley.at('medium', {nextTick: false}, fn.listener);
      expect(fn.listener).toHaveBeenCalled();
    });

    it('should trigger at next tick if a config object is passed, but nextTick is omitted', function(done) {
      volley.at('medium', {fireOnSet: true}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      checkIsCalled(done)
    });
  });

  describe('below', function() {
    it('should not trigger on setting if not matching breakpoint', function(done) {
      volley.below('small', fn.listener);
      checkNotCalled(done);
    });

    it('should not trigger if optional second arg fireOnSet is false', function(done) {
      volley.below('medium', {fireOnSet: false}, fn.listener);
      checkNotCalled(done);
    });

    it('should trigger if optional second arg fireOnSet is not set', function(done) {
      volley.below('medium', fn.listener);
      checkIsCalled(done);
    });

    it('should trigger if optional second arg fireOnSet is set to true', function(done) {
      volley.below('large', {fireOnSet: true}, fn.listener);
      checkIsCalled(done);
    });

    it('should not trigger if breakpoint does not exist', function(done) {
      volley.below('noexist', fn.listener);
      checkNotCalled(done);
    });

    it('should trigger immediately if nextTick is disabled', function() {
      volley.below('medium', {nextTick: false}, fn.listener);
      expect(fn.listener).toHaveBeenCalled();
    });

    it('should trigger at next tick if a config object is passed, but nextTick is omitted', function(done) {
      volley.below('medium', {fireOnSet: true}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      checkIsCalled(done)
    });
  });

  describe('above', function() {
    it('should not trigger on setting if not matching breakpoint', function(done) {
      volley.above('large', fn.listener);
      checkNotCalled(done);
    });

    it('should not trigger if optional second arg fireOnSet is false', function(done) {
      volley.above('medium', {fireOnSet: false}, fn.listener);
      checkNotCalled(done);
    });

    it('should trigger if optional second arg fireOnSet is not set', function(done) {
      volley.above('small', fn.listener);
      checkIsCalled(done);
    });

    it('should trigger if optional second arg fireOnSet is set to true', function(done) {
      volley.above('extrasmall', {fireOnSet: true}, fn.listener);
      checkIsCalled(done);
    });

    it('should not trigger if breakpoint does not exist', function(done) {
      volley.above('noexist', fn.listener);
      checkNotCalled(done);
    });

    it('should trigger immediately if nextTick is disabled', function() {
      volley.above('medium', {nextTick: false}, fn.listener);
      expect(fn.listener).toHaveBeenCalled();
    });

    it('should trigger at next tick if a config object is passed, but nextTick is omitted', function(done) {
      volley.above('medium', {fireOnSet: true}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      checkIsCalled(done)
    });
  });

  describe('between', function() {
    it('should not trigger on setting if not matching breakpoint', function(done) {
      volley.between('large', 'extralarge', fn.listener);
      checkNotCalled(done);
    });

    it('should not trigger if optional third arg fireOnSet is false', function(done) {
      volley.between('medium', 'extralarge', {fireOnSet: false}, fn.listener);
      checkNotCalled(done);
    });

    it('should trigger if optional third arg fireOnSet is not set', function(done) {
      volley.between('medium', 'extralarge', fn.listener);
      checkIsCalled(done);
    });

    it('should trigger if optional third arg fireOnSet is set to true', function(done) {
      volley.between('extrasmall', 'extralarge', {fireOnSet: true}, fn.listener);
      checkIsCalled(done);
    });

    it('should not trigger if first breakpoint does not exist', function(done) {
      volley.between('noexist', 'medium', fn.listener);
      checkNotCalled(done);
    });

    it('should not trigger if second breakpoint does not exist', function(done) {
      volley.between('medium', 'noexist', fn.listener);
      checkNotCalled(done);
    });

    it('should not trigger if either breakpoint does not exist', function(done) {
      volley.between('foo', 'noexist', fn.listener);
      checkNotCalled(done);
    });

    it('should trigger immediately if nextTick is disabled', function() {
      volley.between('medium', 'large', {nextTick: false}, fn.listener);
      expect(fn.listener).toHaveBeenCalled();
    });

    it('should trigger at next tick if a config object is passed, but nextTick is omitted', function(done) {
      volley.between('medium', 'large', {fireOnSet: true}, fn.listener);
      expect(fn.listener).not.toHaveBeenCalled();
      checkIsCalled(done)
    });
  });
});
