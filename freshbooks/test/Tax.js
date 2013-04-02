var assert = require('assert')
  , FreshBooks = require('../');

describe('Tax', function() {
  var freshbooks = new FreshBooks("https://cornerstoneist.freshbooks.com/api/2.1/xml-in","10d8cfaddff7dc9e986d33f2b266b637")
    , tax = new freshbooks.Tax();

  describe("create()", function() {
    it("should create a new tax", function(done) {
      tax.name = "Test Tax";

      tax.create(function(err, tax) {
        done(err);
      });
    });
  });

  describe("update()", function() {
    it("should update a tax", function(done) {
      tax.rate = "25.00";
      
      tax.update(function(err, tax) {
        done(err);
      });
    });
  });

  describe("get()", function() {
    it("should get a tax", function(done) {
      tax.get(tax.tax_id, function(err, tax) {
        done(err);
      });
    });
  });  

  describe("list()", function() {
    it("should list an array of taxes", function(done) {
      tax.list(function(err, taxes) {
        done(err);
      });
    });
  });

  describe("delete()", function() {
    it("should delete a tax", function(done) {
      tax.delete(function(err, tax) {
        done(err);
      });
    });
  });  
});