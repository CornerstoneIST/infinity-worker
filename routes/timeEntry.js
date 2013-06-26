var fb = require('../fb.js')
  ,	fs = require('fs')
  ,	xml2js = require('xml2js')
  , events = require('./events.js')
  ,	controller = require('../controller.js');

var parser = new xml2js.Parser();

module.exports ={
	showTimeEnty:function(req,res){
		events.getProjetID(req.query.task_id,function(doc){
			if(doc)
			events.showTimeEnty(doc.projectID,function(workHours){
				res.contentType('json');
				if(workHours){
					 res.send(workHours.timeEntry);
				}
          	 	else	
           		 res.send({});
			});
		})		
	},

	saveAutoTimeEntry : function(req, res){
		var tags = req.query.fieldsVal.split('/');
		var fields= [];
		var data ={
			userEmail: req.query.userEmail,
			ticketID: req.query.ticketID,
			notes: req.query.notes,
			startTime: req.query.startTime,
			date: req.query.date
		};
		events.findData(req.query.userEmail,function(userData){
			var tasks = userData[0].tasks
			
			for(var i=1; i<tags.length; i++){
				for(var j=0; j< tasks.length; j++){
					if(tags[i] == tasks[j].tagName){
						fields.push({tagName:tags[i], taskName: tasks[j].name});
						break;
					}else
					if(tags[i] == '-'){
						fields.push({tagName:'1', taskName: '-'});
						break;
					}
					else{
						fields.push({tagName:tags[i], taskName:'input' });
						break;
					}

				}
			}
			data.fields = fields;
			console.log('****************');
			console.log(data);;
		})
	
		events.insertAutoTimeEntry(data);
	},

	getAutoTimeEntry : function(req, res){
		console.log(req.query);
		events.getAutoTimeEntry(req.query,function(timeEntryData){
			res.contentType('json');
			if(timeEntryData){
				console.log(timeEntryData);
				console.log('aaaaaaaaaaa');
				res.send(timeEntryData)
			}
				
			else 
				res.send({});
		});
	},
	updateTaskType:function(req,res){
			events.findData(req.query['userEmail'],function(userData){
				var fbData = userData[0].user[0].fb;
				controller.fbInit(fbData);
				var tasks = userData[0].tasks;
				for(var i = 0; i< tasks.length; i++){
			 		if(tasks[i].tagName == req.query.taskName){
						var	taskName = tasks[i].name;
						var contractRate = tasks[i].rate;
						console.log(taskName);
						fb.taskUpdate({task_id: req.query.taskId, name: taskName, rate:contractRate}, function(err,result){
							if(err) console.log(err);
						})
						events.getProjetID(req.query.ticketID,function(doc){
							if(doc){
								req.query.projectID = doc.projectID;
								req.query.taskName = taskName;
								events.updateTimeEntry(req.query);
							}
						})
			 		}
				}

			})
			
			
	},

	updateTimeEntry: function(req,res){
		var timeEntryData = req.query;
		console.log(req.query);

		events.getProjetID(req.query.taskID,function(doc){
		if(doc)
			events.findData( timeEntryData['userEmail'],function(userData){
				var fbData = userData[0].user[0].fb;
					controller.fbInit(fbData);
					fb.updateTimeEntry(timeEntryData,function(xml){
				 		parser.parseString(xml, function (err, result) {
				 			console.log(result);
				 			timeEntryData.projectID = doc.projectID;
				 			events.updateTimeEntry(timeEntryData);
						})
					})
			});
		})
		
	}
}
 