var zd = require('./zd-lib/client'),
	controller = require('./controller.js'),
	express = require('express'),
    subdomain = 'cornerstoneistsandbox',
    username  = 'harut.muradyan@simplytech.co',
    token     = 'DOcSOMIZnuBXKFiTY9HwL0MyQ2TNGNhxLn2UBeTL';


var client = zd.createClient({
  username:  username,
  token:     token,
  remoteUri: 'https://'+subdomain+'.zendesk.com/api/v2'
});

var app = express();

var workType = {
	onsite: 100,
	remote: 75,
	bench: 85
},
hourType = {
	business_hours: 0,
	after_business_hours: 35,
	weekend_standard_hours: 45,
	weekend_after_business_hours: 55
},
sla = {
	standard: 0,
	advanced: 50,
	emergency: 100,
	critical: 150
},
newClent = {},
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

		 var workTypeRate = workType[result.custom_fields[0].value];
		 var hourTypeRate = hourType[result.custom_fields[1].value];
		 var slaRate = sla[result.custom_fields[2].value];
		 var contractType = result.custom_fields[3].value;
		 var contractRate = (contractType == 'task_rate') ?  workTypeRate + hourTypeRate + slaRate : result.custom_fields[4].value;

		var orgID = result.organization_id;
		getOrganization(orgID,function(orgName){

			newClent['organization'] = orgName;
			getClient( result.requester_id, function(){

					project['name'] = 'TICKET '+ id +' - ' + result.subject;
					project['description'] =  result.description;
					project['bill_method'] =  contractType;
					project['rate'] =  contractRate;
					project['name_id'] =  id;
					controller.createTask(newClent,project);

			})

		 })

	})
    
});

app.listen(8081)

