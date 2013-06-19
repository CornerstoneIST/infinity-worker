var mongoose = require('mongoose')
   , User2Task = mongoose.model("User2Task")
   , Project2Time = mongoose.model("Project2Time")
   , Project2Ticket = mongoose.model("Project2Ticket")
   , AutoTimeEntry = mongoose.model("AutoTimeEntry");

module.exports = {
	insertData: function(data){
			var user2Task = new User2Task({
				userName: data.userName,
				user:[{
					zd:  data.zd,
					fb:  data.fb,
				}],
				fields: data.fields,
				tasks: data.tasks
			})
			user2Task.save(function(err){
				if (err) 
					console.log(err.message);
				else
  					console.log('Success!');
			})
	},
	removeData :function(){
		User2Task.remove(function (err) {
			 if (err) 
				console.log(err.message);
			else
					console.log('Success!');
		})
	},

	showData: function(){
		User2Task.find(function (err, user2Task) {
			 if (err) 
				console.log(err.message);
			else
				console.log(user2Task);
		})
	},

	updateData: function(data){
		User2Task.findOne({userName : data.userName},function (err, doc) {
			
			 if (err) 
				console.log(err.message);
			else
				if(doc.length>0 ){

					doc.userName = data.userName;
					doc.user = [{zd:  data.zd, fb:  data.fb}];
					doc.fields = data.fields;
					doc.tasks = data.tasks;
					
					doc.save(function(err){
					if (err) 
						console.log(err.message);
					else
	  					console.log('Success!');
					})
				}
				
		})
	},

	findData: function(data, cb){
		User2Task.find({userName : data},function (err, userData) {
			 if (err) 
				console.log(err.message);
			else
				cb(userData);
		})
	},

	insertAutoTimeEntry :function(data){ 

		AutoTimeEntry.findOne({taskID : data.taskID},function (err, doc) {
			if (err) 
				console.log(err.message);
			else
			if(doc){
				doc.notes = data.notes;
				doc.taskName = data.taskName;
				doc.save(function(err,res){
					if (err) 
						console.log(err.message);
					else{
						console.log('update AutoTimeEntry!');
					}
	  					
					})
			}
			else{
					var autoTimeEntry = new AutoTimeEntry(data);
					autoTimeEntry.save(function(err,res){
						if (err) 
							console.log(err.message);
						else{
							console.log('Save new AutoTimeEntry !');
						}
		  					
					})
				}
		})
	
	},

	getAutoTimeEntry:function(data, cb){
		console.log(data);
		console.log('aaaaaaaaaaaaaaaaaaaaaaa');
		AutoTimeEntry.findOne({taskID : data.taskID},function (err, doc) {
			if(err) console.log(err);
			else{
				console.log(doc);
				cb(doc);
			}
		})
	},
	removeAutoTimeEntry:function(ID){

		AutoTimeEntry.findOne({taskID :ID},function (err, doc) {
			if(err) console.log(err);
			else{
				if(doc)
				doc.remove();
			}
				
			
		})
	},

	insertProject:function(data,cb){

		var project2Ticket = new Project2Ticket(data);

		project2Ticket.save(function(err,res){
			if (err) 
				console.log(err);
			else{
				cb(res);
				console.log('project saved!');
			}
					
		})
	},
	getProjetID:function(id, cb){
		Project2Ticket.findOne({ticketID : id},function (err, doc) {
			if (err) 
				console.log(err.message);
			else
			{
				cb(doc);
			}
		})
	},

	saveTaskID:function(projectId,taskeID){
		Project2Ticket.findOne({ticketID : projectId},function (err, doc) {
			if (err) 
				console.log(err.message);
			else
			{
				console.log(doc);
				doc.tasks.unshift({ID:taskeID});
				doc.save(function(err,res){
					if (err) 
						console.log(err.message);
					else{
						console.log('Save new Task ID');
					}
				})
				//cb(doc);
			}
		})
	},

	showTimeEnty:function(ID,cb){

		Project2Time.findOne({projectID :ID},function (err, doc) {
			if(err) console.log(err);
			else{
				cb(doc);
			}
				
		})
	},
	updateTimeEntry : function(data){
	Project2Time.findOne({taskID : data.taskID},function (err, doc) {
			if (err) 
				console.log(err.message);
			else
			if(doc){
				console.log(doc);

				for(var i =0 ; i < doc.timeEntry.length ; i++ ){
					if(doc.timeEntry[i].id == data.id){
						doc.timeEntry[i].hour = data.hour;
						doc.timeEntry[i].startTime = data.startTime;
						doc.timeEntry[i].endTime = data.endTime;
						break;
					}
				}
				doc.save(function(err,res){
					if (err) 
						console.log(err.message);
					else{
						console.log('timeEntry hour update!');
					}
			   })
				
			}
		})
	},
	insertTimeEntry:function(data){

		Project2Time.findOne({projectID : data.projectID},function (err, doc) {
			if (err) 
				console.log(err.message);
			else
			if(doc){
				doc.timeEntry.unshift({id:data.time_entry_id, notes: data.workDescription, hour:data.hour, startTime: data.startTime, endTime:data.endTime, taskId :data.taskId, taskName: data.taskName})
				doc.save(function(err,res){
					if (err) 
						console.log(err.message);
					else{
						console.log(res);

						console.log('timeEntry update!');
					}
	  					
					})
			}
			else{

				var project2Time = new Project2Time({
					projectID : data.projectID,
					timeEntry:[{id:data.time_entry_id, notes: data.workDescription, hour:data.hour, startTime: data.startTime, endTime:data.endTime, taskId :data.taskId, taskName: data.taskName}]
				})

				project2Time.save(function(err,res){
					if (err) 
						console.log(err.message);
					else{
						console.log(res);
						console.log('timEntry save!');
					}
	  					
				})
				
			}
				
		})
	}

	
}