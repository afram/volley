var volley = require('../lib/volley');
var fn;

describe('comparators multi value', function() {
  beforeEach(function() {
    fn = jasmine.createSpyObj('fn', ['listener']);
  });

  describe('isGreaterThan', function() {
    it('should return true that medium is greater than small', function() {
      expect(volley.isGreaterThan('medium', 'small')).toEqual(true);
    });

    it('should return false that medium is greater than large', function() {
      expect(volley.isGreaterThan('medium', 'large')).toEqual(false);
    });

    it('should return false that medium is greater than medium', function() {
      expect(volley.isGreaterThan('medium', 'medium')).toEqual(false);
    });

    it('should return false if first breakpoint does not exist', function() {
      expect(volley.isGreaterThan('nonexistent', 'medium')).toEqual(false);
    });

    it('should return false if second breakpoint does not exist', function() {
      expect(volley.isGreaterThan('medium', 'nonexistent')).toEqual(false);
    });
  });

  describe('isGreaterThanOrEqual', function() {
    it('should return true that medium is greater than or equal to small', function() {
      expect(volley.isGreaterThanOrEqual('medium', 'small')).toEqual(true);
    });

    it('should return true that medium is greater than or equal to medium', function() {
        expect(volley.isGreaterThanOrEqual('medium', 'medium')).toEqual(true);
    });

    it('should return false that medium is greater than or equal to large', function() {
      expect(volley.isGreaterThanOrEqual('medium', 'large')).toEqual(false);
    });

    it('should return false if first breakpoint does not exist', function() {
      expect(volley.isGreaterThanOrEqual('nonexistent', 'medium')).toEqual(false);
    });

    it('should return false if second breakpoint does not exist', function() {
      expect(volley.isGreaterThanOrEqual('medium', 'nonexistent')).toEqual(false);
    });
  });

  describe('isLessThan', function() {
    it('should return true that medium is less than large', function() {
      expect(volley.isLessThan('medium', 'large')).toEqual(true);
    });

    it('should return false that medium is less than small', function() {
      expect(volley.isLessThan('medium', 'small')).toEqual(false);
    });

    it('should return false that medium is less than medium', function() {
      expect(volley.isLessThan('medium', 'medium')).toEqual(false);
    });

    it('should return false if first breakpoint does not exist', function() {
      expect(volley.isLessThan('nonexistent', 'medium')).toEqual(false);
    });

    it('should return false if second breakpoint does not exist', function() {
      expect(volley.isLessThan('medium', 'nonexistent')).toEqual(false);
    });
  });

  describe('isLessThanOrEqual', function() {
    it('should return true that medium is less than or equal to large', function() {
      expect(volley.isLessThanOrEqual('medium', 'large')).toEqual(true);
    });

    it('should return true that medium is less than or equal to medium', function() {
      expect(volley.isLessThanOrEqual('medium', 'medium')).toEqual(true);
    });

    it('should return false that medium is less than or equal to small', function() {
      expect(volley.isLessThanOrEqual('medium', 'small')).toEqual(false);
    });

    it('should return false if first breakpoint does not exist', function() {
      expect(volley.isLessThanOrEqual('nonexistent', 'medium')).toEqual(false);
    });

    it('should return false if second breakpoint does not exist', function() {
      expect(volley.isLessThanOrEqual('medium', 'nonexistent')).toEqual(false);
    });
  });

  describe('isEqual', function() {
    it('should return true that medium is equal to medium', function() {
      expect(volley.isEqual('medium', 'medium')).toEqual(true);
    });

    it('should return false that medium is equal to large', function() {
      expect(volley.isEqual('medium', 'large')).toEqual(false);
    });

    it('should return false that medium is equal to small', function() {
      expect(volley.isEqual('medium', 'small')).toEqual(false);
    });

    it('should return false if first breakpoint does not exist', function() {
      expect(volley.isEqual('nonexistent', 'medium')).toEqual(false);
    });

    it('should return false if second breakpoint does not exist', function() {
      expect(volley.isEqual('medium', 'nonexistent')).toEqual(false);
    });
  });
});
