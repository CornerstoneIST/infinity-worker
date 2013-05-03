var ticketchanged = require('./routes/ticketchanged.js')
  , http = require('http')
  ,	express = require('express');

var app = express();
app.configure(function(){
	 app.set('port', process.env.PORT || 8081);
})
app.get('/ticketchanged', ticketchanged.ticketHandle);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

module.exports = app;