var assert = require('assert')
  , FreshBooks = require('../');

describe('Language', function() {
  var freshbooks = new FreshBooks("https://cornerstoneist.freshbooks.com/api/2.1/xml-in","10d8cfaddff7dc9e986d33f2b266b637")
    , language = new freshbooks.Language();

  describe("list()", function() {
    it("should list an array of languages", function(done) {
      language.list(function(err, languages) {
        done(err);
      });
    });
  });
});