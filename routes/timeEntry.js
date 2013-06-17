var fb = require('../fb.js')
  ,	fs = require('fs')
  ,	xml2js = require('xml2js')
  , events = require('./events.js')
  ,	controller = require('../controller.js');

var parser = new xml2js.Parser();

module.exports ={
	showTimeEnty:function(req,res){
		events.showTimeEnty(req.query,function(workHours){
			res.contentType('json');
			if(workHours){
				console.log(workHours);
				 res.send(workHours.timeEntry);
			}
           		
           	else	
           		res.send({});
		});
		
	},

	saveAutoTimeEntry : function(req, res){
		events.insertAutoTimeEntry(req.query);
	},

	getAutoTimeEntry : function(req, res){
		events.getAutoTimeEntry(req.query,function(timeEntryData){
			res.contentType('json');
			if(timeEntryData){
				res.send(timeEntryData)
			}
				
			else 
				res.send({});
		});
	},
	updateTimeEntry: function(req,res){
		var timeEntryData = req.query;
		console.log(req.query);
		events.findData( timeEntryData['userEmail'],function(userData){
			var fbData = userData[0].user[0].fb;
				controller.fbInit(fbData);
				fb.updateTimeEntry(timeEntryData,function(xml){
			 		parser.parseString(xml, function (err, result) {
			 			console.log(result);
			 			events.updateTimeEntry(timeEntryData);
					})
				})
		});
		
	}
}
 