var assert = require('assert')
  , FreshBooks = require('../');

describe('Staff', function() {
  var freshbooks = new FreshBooks("https://cornerstoneist.freshbooks.com/api/2.1/xml-in","10d8cfaddff7dc9e986d33f2b266b637")
    , staff = new freshbooks.Staff();

  describe("current()", function() {
    it("should return current staff member", function(done) {
      staff.current(function(err, staff) {
        done(err);
      });
    });
  });

  describe("get()", function() {
    it("should get an staff", function(done) {
      staff.get(staff.staff_id, function(err, staff) {
        done(err);
      });
    });
  });  

  describe("list()", function() {
    it("should list an array of staffs", function(done) {
      staff.list(function(err, staffs) {
        done(err);
      });
    });
  });
});