var events = require('./events.js')
  , tasks = require('../tasks.js')
  , zd = require('../zd-lib/client')
  , mongoose = require('mongoose')
  , User2Task = mongoose.model("User2Task");

module.exports ={

	userHandle: function(req,res){
		var dbData = {
			userName : req.query.userEmail,
			zd: {
				subdomain: req.query.subdomain,
			    username: req.query.userEmail,
			    token: req.query.zendeskToken
			},

			fb: {
				host: req.query.fbHost,
				token: req.query.fbToken
			},
			fields: tasks.fields,
			tasks: tasks.newTasks
		};

	
		User2Task.findOne({userName : dbData.userName},function (err, doc) {
			if(doc){
				doc.user[0].fb = dbData.fb;
				doc.user[0].zd = dbData.zd;
				doc.save(function(err){
					if (err) 
						console.log(err.message);
					else{
						console.log('Success!');
					}
	  					
				})
			}
			else{
				events.insertData(dbData);
				createTiketFields(dbData);
			}
				
		});

		 function createTiketFields(){
			var client = zd.createClient({
			  username:  dbData.zd.username,
			  token:     dbData.zd.token,
			  remoteUri: 'https://'+dbData.zd.subdomain+'.zendesk.com/api/v2'
			});

			var fields = dbData.fields;
			var tasks = dbData.tasks;

		  	var newfields=[];
		  	for(var i = 0; i < fields.length; i++){
		  		if(fields[i].type == 'list'){
		  			var customFieldOptions = [];
		  			for (var j=0; j < tasks.length; j++){
		  				if(tasks[j].parent == fields[i].tagName){
		  					customFieldOptions.push({'name':tasks[j].name, 'value' :tasks[j].tagName })
		  				}
		  			}
		  			var title = fields[i].name;
		  			newfields.push({"ticket_field": {"type": "tagger", "title": title , "custom_field_options" : customFieldOptions}});
		  		}
		  		else if(fields[i].type == 'input'){
		  			newfields.push({"ticket_field": {"type": "text", "title":fields[i].name }})
		  		}
		  	}

		  	if(newfields.length > 0){
		  		createField();
		  	}

		  	var i = 0;
		  	function createField(){
	  			var data = newfields;
	  			client.ticketfields.create(data[i],function(err,req,result){
	  				console.log(i)
					if(err) console.log(err)
						else{
							if(data.length > i){
								console.log(result)
								createField();
								i++;
							}
					} 
				})

		  	};

		}

		
	},


}