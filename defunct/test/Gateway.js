var assert = require('assert')
  , FreshBooks = require('../');

describe('Gateway', function() {
  var freshbooks = new FreshBooks("https://cornerstoneist.freshbooks.com/api/2.1/xml-in","10d8cfaddff7dc9e986d33f2b266b637")
    , gateway = new freshbooks.Gateway();

  describe("list()", function() {
    it("should list an array of gateways", function(done) {
      gateway.list(function(err, gateways) {
        done(err);
      });
    });
  });
});