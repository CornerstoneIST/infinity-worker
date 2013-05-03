var zd = require('./zd-lib/client'),
	controller = require('./controller.js'),
	rate = require('./rate.js'),
	config = require('./config.js'),
	express = require('express');


var client = zd.createClient({
  username:  config.zd.username,
  token:     config.zd.token,
  remoteUri: 'https://'+config.zd.subdomain+'.zendesk.com/api/v2'
});

var app = express();
var newClent = {},
	project = {};

function getOrganization(orgID, cb){
	client.organizations.show(orgID,function(orgErr, orgReq, orgResult){
			 if (orgErr) {
			    console.log(orgErr);
			    return;
			  };
			 cb(orgResult.name);
		});
};

function getClient(contID,cb){
	 client.users.show(contID,function(contErr, contReq, conResult){
		 	if (contErr) {
			    console.log(contErr);
			    return;
			  }

			 newClent['first_name'] = conResult.name;
			 newClent['last_name'] = '';
			 newClent['email'] = conResult.email;
			 newClent['work_phone'] = conResult.phone;
			 cb();

		 });
};

app.get('/ticketchanged', function(req, res){
  var id = req.query['id'],
    status = req.query['status'];

    client.tickets.show(id,function(err, req, result){

		 if (err) {
		    console.log(err);
		    return;
		  }

		 if(result.assignee_id){

		 	var taskName = '';
		 	var  contractRate = 0;
			var contractType = result.custom_fields[3].value;
			if(contractType && contractType != 'task-rate'){
				contractRate =  result.custom_fields[4].value;
				var contractKey = contractType;
				taskName = rate.hourlyTask[contractKey.replace('-','')]['name']; 
			}
			else{
			 	if(result.custom_fields[0].value){
			 		contractRate = rate.workType[result.custom_fields[0].value]['value'];
			 		taskName = rate.workType[result.custom_fields[0].value]['name'];
			 	}
			 	
			 	if(result.custom_fields[1].value){
			 		
			 		contractRate += rate.hourType[result.custom_fields[1].value]['value'];
			 		var name = rate.hourType[result.custom_fields[1].value]['name'];
			 		taskName += taskName? ' - ' + name : name;
			 	}
				if(result.custom_fields[2].value){
			 		contractRate += rate.sla[result.custom_fields[2].value]['value'];
			 		var name = rate.sla[result.custom_fields[2].value]['name'];
			 		taskName += taskName? ' - ' + name : name;
			 	}
			}
			

			var orgID = result.organization_id;
			getOrganization(orgID,function(orgName){

				newClent['organization'] = orgName;
				getClient( result.requester_id, function(){
					
					taskName = taskName.length > 42 ? taskName.substring(0,42) + '...#'+id : taskName + ' #' + id ;
						project['name'] = 'TICKET '+ id +' - ' + result.subject;
						project['description'] =  result.description;
						project['bill_method'] =  contractType;
						project['rate'] =  contractRate;
						project['name_id'] = taskName;
					
						console.log(taskName.substring(taskName.indexOf('#')+1,taskName.length))
						controller.createTask(newClent,project);

				})

			 })
		 }

	})
    
});

app.listen(8081)

