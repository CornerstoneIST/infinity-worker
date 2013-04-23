//Triggers.js: Client for the zendesk API.

var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var Triggers = exports.Triggers = function (options) {
  this.jsonAPIName = 'triggers';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Triggers, Client);

// ######################################################## Tags

// ====================================== Listing Tags
Triggers.prototype.list = function (cb) {
  this.requestAll('GET', ['triggers'], cb);//all
};

Triggers.prototype.activeTrigers = function (cb) {
  this.requestAll('GET', ['triggers', 'active'], cb);//all?
};

// ====================================== Creating Triggers
Triggers.prototype.create = function (trigger, cb) {
  this.request('POST', ['triggers'], trigger,  cb);
};
// ====================================== Updating Triggers
Triggers.prototype.update = function (triggersID, trigger, cb) {
  this.request('PUT', ['triggers', triggersID], triggers,  cb);
};