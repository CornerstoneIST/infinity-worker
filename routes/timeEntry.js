var events = require('./events.js');

module.exports ={
	showTimeEnty:function(req,res){
		events.showTimeEnty(req.query,function(workHours){
			res.contentType('json');
			if(workHours){
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
	}
}
 