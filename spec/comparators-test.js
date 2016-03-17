var volley = require('../lib/volley');
var helpers = require('./helpers');
var fn;

describe('comparators', function() {
  beforeEach(function(done) {
    fn = jasmine.createSpyObj('fn', ['listener']);
    helpers.resetTestEnv('medium', done);
  });

  describe('isGreaterThan', function() {
    it('should return true that medium is greater than small', function() {
      expect(volley.isGreaterThan('small')).toEqual(true);
    });

    it('should return false that medium is greater than large', function() {
      expect(volley.isGreaterThan('large')).toEqual(false);
    });

    it('should return false that medium is greater than medium', function() {
      expect(volley.isGreaterThan('medium')).toEqual(false);
    });

    it('should return false if breakpoint does not exist', function() {
      expect(volley.isGreaterThan('nonexistent')).toEqual(false);
    });
  });

  describe('isGreaterThanOrEqual', function() {
    it('should return true that medium is greater than or equal to small', function() {
      expect(volley.isGreaterThanOrEqual('small')).toEqual(true);
    });

    it('should return true that medium is greater than or equal to medium', function() {
        expect(volley.isGreaterThanOrEqual('medium')).toEqual(true);
    });

    it('should return false that medium is greater than or equal to large', function() {
      expect(volley.isGreaterThanOrEqual('large')).toEqual(false);
    });

    it('should return false if breakpoint does not exist', function() {
      expect(volley.isGreaterThanOrEqual('nonexistent')).toEqual(false);
    });
  });

  describe('isLessThan', function() {
    it('should return true that medium is less than large', function() {
      expect(volley.isLessThan('large')).toEqual(true);
    });

    it('should return false that medium is less than small', function() {
      expect(volley.isLessThan('small')).toEqual(false);
    });

    it('should return false that medium is less than medium', function() {
      expect(volley.isLessThan('medium')).toEqual(false);
    });

    it('should return false if breakpoint does not exist', function() {
      expect(volley.isLessThan('nonexistent')).toEqual(false);
    });
  });

  describe('isLessThanOrEqual', function() {
    it('should return true that medium is less than or equal to large', function() {
      expect(volley.isLessThanOrEqual('large')).toEqual(true);
    });

    it('should return true that medium is less than or equal to medium', function() {
      expect(volley.isLessThanOrEqual('medium')).toEqual(true);
    });

    it('should return false that medium is less than or equal to small', function() {
      expect(volley.isLessThanOrEqual('small')).toEqual(false);
    });

    it('should return false if breakpoint does not exist', function() {
      expect(volley.isLessThanOrEqual('nonexistent')).toEqual(false);
    });
  });

  describe('isEqual', function() {
    it('should return true that medium is equal to medium', function() {
      expect(volley.isEqual('medium')).toEqual(true);
    });

    it('should return false that medium is equal to large', function() {
      expect(volley.isEqual('large')).toEqual(false);
    });

    it('should return false that medium is equal to small', function() {
      expect(volley.isEqual('small')).toEqual(false);
    });

    it('should return false if breakpoint does not exist', function() {
      expect(volley.isEqual('nonexistent')).toEqual(false);
    });
  });
});
