var assert = require('assert')
  , FreshBooks = require('../');

describe('Item', function() {
  var freshbooks = new FreshBooks("https://cornerstoneist.freshbooks.com/api/2.1/xml-in","10d8cfaddff7dc9e986d33f2b266b637")
    , item = new freshbooks.Item();

  describe("create()", function() {
    it("should create a new item", function(done) {
      item.name = "Test Item" + Math.random();

      item.create(function(err, item) {
        done(err);
      });
    });
  });

  describe("update()", function() {
    it("should update an item", function(done) {
      item.description = "Test Item";
      
      item.update(function(err, item) {
        done(err);
      });
    });
  });

  describe("get()", function() {
    it("should get an item", function(done) {
      item.get(item.item_id, function(err, item) {
        done(err);
      });
    });
  });  

  describe("list()", function() {
    it("should list an array of items", function(done) {
      item.list(function(err, items) {
        done(err);
      });
    });
  });

  describe("delete()", function() {
    it("should delete an item", function(done) {
      item.delete(function(err, item) {
        done(err);
      });
    });
  });  
});