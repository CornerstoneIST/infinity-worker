var  http = require('http')
  ,	express = require('express');


// Load configurations
console.log("[INFO] Reading configurations");
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env];  

//Init DB
require("./db_initializer").init(config);


var app = express();
app.configure(function(){
	app.set('port', process.env.PORT || 8081);
})

var user = require('./routes/user.js')
app.get('/createNewUser', user.userHandle);

var ticketchanged = require('./routes/ticketchanged.js')
app.get('/ticketchanged', ticketchanged.ticketHandle);

var timeEntry = require('./routes/timeEntry.js')
app.get('/timeEntry', timeEntry.showTimeEnty);
app.get('/saveAutoTimeEntry', timeEntry.saveAutoTimeEntry);
app.get('/getAutoTimeEntry', timeEntry.getAutoTimeEntry);
app.get('/updateTimeEntry', timeEntry.updateTimeEntry);
app.get('/updateTaskType', timeEntry.updateTaskType);

var customefields = require('./routes/customefields.js')
app.get('/getcustomefields', customefields.getCustomeFields);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

module.exports = app;