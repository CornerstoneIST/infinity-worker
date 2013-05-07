var zd = require('../zd-lib/client')
  ,	controller = require('../controller.js')
  , events = require('../routes/events.js');

module.exports ={

	ticketHandle:function(req,res){

		events.findData( 'harut.muradyan@simplytech.co',function(userData){
			
			var zdData = userData[0].user[0].zd;
			var fbData = userData[0].user[0].fb;
			var tasks = userData[0].tasks;
			controller.fbInit(fbData);

			var client = zd.createClient({
			  username:  zdData.username,
			  token:     zdData.token,
			  remoteUri: 'https://'+zdData.subdomain+'.zendesk.com/api/v2'
			});

			var newClent = {},
				project = {};

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
						var contractType = '';
						var taskType = '';
						var customeContractRate = 0;
						var toggleBreak = false;

					 	for(var i = 0 ; i < result.custom_fields.length; i++){
					 		if(toggleBreak)
					 			break;

					 		if(result.custom_fields[i]['value'] ){
					 			for(var j = tasks.length - 1; j >= 0; j-- ){

					 				if(result.custom_fields[i]['value'] == tasks[j]['tagName'] ){
					 					if(tasks[j]['contractType'])
											contractType = tasks[j]['contractType'];

					 					taskType = (taskType == 'reset' || taskType == 'custom' )?  taskType : tasks[j]['type'];

					 					if( taskType == 'custom' ){
					 						taskType =  tasks[j]['type'];
					 						taskName =  tasks[j]['name'];
					 					}
										else {
											taskName += taskName? ' - ' + tasks[j]['name'] : tasks[j]['name'];
											contractRate += parseInt(tasks[j]['rate'])
										}
										
					 				}
					 				else customeContractRate = result.custom_fields[i]['value'];

					 			}
					 		}
					 	}
					 	if(taskType == 'reset')
					 		contractRate = 0;
					 	if(taskType == 'custom')
					 		contractRate = customeContractRate;

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
									
									controller.createTask(newClent,project);

							})

						 })
					 }

				})


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

		})

	}
}

