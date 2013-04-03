var assert = require('assert')
  , FreshBooks = require('../');

describe('Category', function() {
  var freshbooks = new FreshBooks("https://cornerstoneist.freshbooks.com/api/2.1/xml-in","10d8cfaddff7dc9e986d33f2b266b637")
    , category = new freshbooks.Category();

  describe("create()", function() {
    it("should create a new category", function(done) {
      category.name = "Test Category";

      category.create(function(err, category) {
        done(err);
      });
    });
  });

  describe("update()", function() {
    it("should update an category", function(done) {
      category.name = "Test Category 2";
      
      category.update(function(err, category) {
        done(err);
      });
    });
  });

  describe("get()", function() {
    it("should get an category", function(done) {
      category.get(category.category_id, function(err, category) {
        done(err);
      });
    });
  });  
  
  describe("list()", function() {
    it("should list an array of categories", function(done) {
      category.list({"client_id": category.client_id}, function(err, categories) {
        done(err);
      });
    });
  });

  describe("delete()", function() {
    it("should delete an category", function(done) {
      category.delete(function(err, category) {
        done(err);
      });
    });
  });  
});