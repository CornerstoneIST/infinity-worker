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
									projData['hours'] = project.hours;
									projData['workDescription'] = project.workDescription;
									projData['ID'] = project.id;
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
									projData['hours'] = project.hours;
									projData['workDescription'] = project.workDescription;
									projData['ID'] = project.id;
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
		self._checkTaskExists(data,function(checkData){
		fb.projectList(data,function(xml){
			
			parser.parseString(xml, function (err, result) {
			 var total = parseInt(result['response']['projects'][0]['$']['total']);
				if(total == 0){
					console.log('new')
					fb.createProject(data,function(xml){
						parser.parseString(xml, function (err, result) {
							var project_id = result.response.project_id;
						
							checkData.project_id = project_id;
							cb(checkData);
						})
					})
				}else{
					console.log('update')
					var projectID = parseInt(result['response']['projects'][0]['project'][0]['project_id']);
						data['project_id'] = projectID;
					 	fb.projectUpdate(data,function(xml){
					 		parser.parseString(xml, function (err, result) {
					 			cb(checkData);
							})
					 	})
				}

			})

		})
			
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
				   		var dataID =  data['name_id'].substring( data['name_id'].indexOf('#')+1, data['name_id'].length);

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
		fb.createTimeEntry(data,function(xml){
			parser.parseString(xml, function (err, result) {
				if(err) console.log(err);
				else
					{	if(result){
							console.log(result);

							var time_entry_id = result.response.time_entry_id[0];
							data.time_entry_id = time_entry_id;
							console.log(data.ID);
							events.insertTimeEntry(data);
							if(data.timeEntryType == 'auto')
								events.removeAutoTimeEntry(data.ID);
						}
						
					}
			})
		})
	}

}



