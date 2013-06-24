var fb = require('./fb.js')
  ,	fs = require('fs')
  ,	xml2js = require('xml2js')
  , events = require('./routes/events.js');

var parser = new xml2js.Parser();

module.exports = {
	fbInit:function(data){
		fb.init(data.host, data.token);
	},

	createTask: function(data, project){
		var self = this;
		fb.clientList({email:data.email},function(xml){

			parser.parseString(xml, function (err, result) {
				var createNewClient = true;
				var clientID = 0;

				var total = result['response']['clients'][0]['$']['total'];
	
			   if(total>0){
					var clients = result['response']['clients'][0]['client'];
					for(var i = 0; i < total; i++){
						if(clients[i]['organization'] == data.organization){
							createNewClient = false;
							clientID = parseInt(clients[i]['client_id'][0]);
							project['client_id'] = clientID;
							self._checkProjectExists(project,function(projData){
								if(project.timeEntryType ){
									projData['hour'] = project.hours;
									projData['workDescription'] = project.workDescription;
									projData['startTime'] = project.startTime;
									projData['endTime'] = project.endTime;
									projData['taskName'] = project.name;
									projData['date'] = project.date;
									self._timeEntry(projData);
								}
								
							})
							
						}
							
					}		
			   }
			   
			   if(total == 0 || createNewClient){
			   		self._createNewClient(data,function(newClient){
			   			clientID = parseInt(newClient['response']['client_id'][0]);
			   			project['client_id'] = clientID;
			   			self._checkProjectExists(project,function(projData){
			   					if(project.timeEntryType){
									projData['hour'] = project.hours;
									projData['workDescription'] = project.workDescription;
									projData['startTime'] = project.startTime;
									projData['endTime'] = project.endTime;
									projData['taskName'] = project.name;
									projData['date'] = project.date;
									self._timeEntry(projData);
								}
			   			})

			   		})
			   }
			   
			})
		})
	},
	
	_createNewClient : function(data,cb){
		fb.createClient(data,function(xml){
			parser.parseString(xml, function (err, result) {
			    cb(result);
			 
			})
		})

	},

	_checkProjectExists:function(data, cb){
		var self = this; 
		self._createNewTask(data, function(taskID){
			data.task_id = parseInt(taskID);
			data.tasksID = [{ID:data.task_id}];

			events.getProjetID(data['id'],function(doc){
				if(doc){
					doc.tasks.push({ID:data.task_id});
					data.tasksID = doc.tasks;
					data.project_id = doc.projectID;
						fb.projectUpdate(data,function(xml){
					 		parser.parseString(xml, function (err, result) {
					 			console.log('project Update!');
					 			events.saveTaskID(data['id'], data.task_id);
					 			cb({ projectID: data.project_id, taskId :data.task_id,ticketID : data['id'] });
							})
						})
						
				}else{
			
					fb.createProject(data,function(xml){
						parser.parseString(xml, function (err, result) {
							console.log('new project!');
							var project_id = result.response.project_id;
							events.insertProject({projectID: project_id, ticketID: data['id'], tasks: data.tasksID},function(projectData){
								cb({ projectID: project_id, taskId :data.task_id, ticketID : data['id'] });
							});
								
						})
					})
				}
			})

			//
		})
	},
	
	_checkTaskExists:function(data,cb){
		var self = this; 
		var newTask = true;
		fb.taskList(data,function(xml){
			parser.parseString(xml, function (err, result) {
			   var total = result['response']['tasks'][0]['$']['total'];
			  
			   if(total>0){
			   	 var tasks = result['response']['tasks'][0]['task'];

				   	for(var i = 0; i < total; i++){

				   		var taskName = '' + tasks[i]['name'];
				   		var taskID = taskName.substring(taskName.indexOf('#')+1,taskName.length);
				   		//var dataID =  data['name_id'].substring( data['name_id'].indexOf('#')+1, data['name_id'].length);

				   		if(taskID == dataID){
				   			newTask =false;
				   			data['task_id'] = parseInt(tasks[i]['task_id']);
				   			self._updateTask(data,function(updateTaskDate){
				   				cb(data);
				   			})
				   		}
				   	}
			   }
			   if(total == 0 || newTask)
			   	self._createNewTask(data,function(newTaskID){
			   		data['task_id'] = parseInt(newTaskID)
			   		cb(data);
			   	})
			})
		})
	},

	_updateTask:function(data, cb){
		fb.taskUpdate(data,function(xml){
			parser.parseString(xml, function (err, result) {
			    cb(result);
			})
		})
	},

	_createNewTask:function(data, cb){
	
		fb.createTask(data,function(xml){
			parser.parseString(xml, function (err, result) {
			   cb(result['response']['task_id'][0]);
			})
		})
	},

	_timeEntry:function(data){
console.log(data)
		fb.createTimeEntry(data,function(xml){
			parser.parseString(xml, function (err, result) {
				console.log(result);
				console.log('**********');
				if(err) console.log(err);
				else
					{	if(result){
							var time_entry_id = result.response.time_entry_id[0];
							data.time_entry_id = time_entry_id;
					
							events.insertTimeEntry(data);
								events.removeAutoTimeEntry(data.ticketID);
						}
						
					}
			})
		})
	}

}



