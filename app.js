var tasks = require('./tasks.js')
  , http = require('http')
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

var dbData ={
	userName : 'harut.muradyan@simplytech.co',
	zd: config.zd,
	fb: config.fb,
	tasks: tasks.newTasks
}

var events = require('./routes/events.js');
//events.insertData(dbData);
//events.removeData();
events.showData();

var ticketchanged = require('./routes/ticketchanged.js')
app.get('/ticketchanged', ticketchanged.ticketHandle);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

module.exports = app;