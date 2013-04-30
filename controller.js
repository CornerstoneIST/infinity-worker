var fb = require('./fb.js'),
fs = require('fs'),
	xml2js = require('xml2js');

	fb.init('cornerstoneistsandbox.freshbooks.com','9936916e20a4f05e4a81889b235ccce9');
var parser = new xml2js.Parser();


module.exports = {

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
							self.checkProjectExists(project)
							
						}
							
					}		
			   }
			   
			   if(total == 0 || createNewClient){
			   		self.createNewClient(data,function(newClient){
			   			clientID = parseInt(newClient['response']['client_id'][0]);
			   			project['client_id'] = clientID;
			   			self.checkProjectExists(project)

			   		})
			   }
			   
			})
		})
	},
	
	createNewClient : function(data,cb){
		fb.createClient(data,function(xml){
			parser.parseString(xml, function (err, result) {
			    cb(result);
			 
			})
		})

	},

	checkProjectExists:function(data){
		var self = this; 
		self.checkTaskExists(data,function(checkData,status){
		fb.projectList(data,function(xml){
			
			parser.parseString(xml, function (err, result) {
				console.log(result['response']['projects'])
			 var total = parseInt(result['response']['projects'][0]['$']['total']);
			 
			 console.log(total)
			 
				if(total == 0){
					console.log(checkData)
					fb.createProject(data,function(xml){})
				}else{

					var projectID = parseInt(result['response']['projects'][0]['project'][0]['project_id']);
						data['project_id'] = projectID;
					 	fb.projectUpdate(data,function(xml){})
				}

			})

		})

		//console.log(total);
			/*if(total == 0){
				console.log(checkData)
				fb.createProject(data,function(xml){})
			}
			else{
				fb.projectList(data,function(xml){
					parser.parseString(xml, function (err, result) {
						console.log(result['response']['projects'][0]['project']);
						var projectID = parseInt(result['response']['projects'][0]['project'][0]['project_id']);
						data['project_id'] = projectID;
					 	fb.projectUpdate(data,function(xml){})
					})
				})
			}*/
			
		})
	},
	
	checkTaskExists:function(data,cb){
		var self = this; 
		var newTask = true;
		fb.taskList(data,function(xml){
			parser.parseString(xml, function (err, result) {
			   var total = result['response']['tasks'][0]['$']['total'];
			  
			   if(total>0){
			   	 var tasks = result['response']['tasks'][0]['task'];

				   	for(var i = 0; i < total; i++){
				   		if(parseInt(tasks[i]['name']) == data.name_id){
				   			newTask =false;
				   			data['task_id'] = parseInt(tasks[i]['task_id'])
				   			self.updateTask(data,function(updateTaskDate){
				   				cb(data, 'update');
				   			})
				   		}
				   	}
			   }
			   if(total == 0 || newTask)
			   	self.createNewTask(data,function(newTaskID){
			   		data['task_id'] = parseInt(newTaskID)
			   		cb(data, 'new');
			   	})
			})
		})
	},

	updateTask:function(data, cb){
		fb.taskUpdate(data,function(xml){
			parser.parseString(xml, function (err, result) {
			    cb(result);
			})
		})
	},

	createNewTask:function(data, cb){
		fb.createTask(data,function(xml){
			parser.parseString(xml, function (err, result) {
			   cb(result['response']['task_id'][0]);
			})
		})
	},

}



