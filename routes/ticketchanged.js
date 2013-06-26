var zd = require('../zd-lib/client')
  ,	controller = require('../controller.js')
  , events = require('../routes/events.js');

module.exports ={

	ticketHandle:function(req,res){
		var tiketData = req.query;
		var hours =  req.query.workHours;
		var workDescription = req.query.workDescription;
		var timeEntryType = req.query.timeEntryType;
		var startTime = req.query.startTime;
		var endTime = req.query.endTime;
		var tagName = req.query.taskName;
		var date = req.query.date;
		var taskName = req.query.taskName;
		var contractRate = req.query.contractRate;
		var contractType = req.query.contractType;
		

		events.findData( tiketData['userEmail'],function(userData){
			
			var zdData = userData[0].user[0].zd;
			var fbData = userData[0].user[0].fb;
			var tasks = userData[0].tasks;
			var fields = userData[0].fields;
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

					 if(result.assignee_id || req.query['assignee_id']){

						var orgID = result.organization_id;
						getOrganization(orgID,function(orgName){

							newClent['organization'] = orgName;
							getClient( result.requester_id, function(){
								
									taskName = taskName.length > 42 ? taskName.substring(0,42) + '...': taskName + ' ';
									project['projName'] = 'TICKET '+ id +' - ' + tiketData['subject'] ;
									project['description'] = tiketData['description'] ;
									project['bill_method'] = contractType;
									project['rate'] =  contractRate;
									project['timeEntryType'] = timeEntryType;
									if(timeEntryType){
										project['name'] = taskName;
										project['hours'] = hours;
										project['workDescription'] = workDescription;
										project['startTime'] = startTime;
										project['endTime'] = endTime;
										project['date'] = date;

									}
									project['id'] = id;
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

