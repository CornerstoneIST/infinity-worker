var assert = require('assert')
var describe = require('describe')
var FreshBooks = require('freshbooks');  

describe('Time Entry', function() {
var freshbooks = new FreshBooks("https://cornerstoneist.freshbooks.com/api/2.1/xml-in","10d8cfaddff7dc9e986d33f2b266b637")
    , time_entry = new freshbooks.Time_Entry();

  describe("create()", function() {
    it("should create a new time entry", function(done) {
      time_entry.project_id = 1;
      time_entry.task_id = 1;

      time_entry.create(function(err, time_entry) {
        done(err);
      });
    });
  });

  describe("update()", function() {
    it("should update a time entry", function(done) {
      time_entry.hours = "25.00";
      
      time_entry.update(function(err, time_entry) {
        done(err);
      });
    });
  });

  describe("get()", function() {
    it("should get a time entry", function(done) {
      time_entry.get(time_entry.time_entry_id, function(err, time_entry) {
        done(err);
      });
    });
  });  

  describe("list()", function() {
    it("should list an array of time entries", function(done) {
      time_entry.list(function(err, time_entries) {
        done(err);
      });
    });
  });

  describe("delete()", function() {
    it("should delete a time entry", function(done) {
      time_entry.delete(function(err, time_entry) {
        done(err);
      });
    });
  });  
});