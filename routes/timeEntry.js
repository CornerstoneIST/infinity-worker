var events = require('./events.js');
module.exports ={
	showTimeEnty:function(req,res){
		events.showTimeEnty(req.query,function(workHours){
			res.contentType('json');
			if(workHours)
           		 res.send(workHours.timeEntry);
           	else	
           		res.send({});
		});
		
		
	}
}
 