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
						console.log('Update!!');
					}
	  					
				})
			}
			else{
				events.insertData(dbData);
				console.log('newUser!');
			}
				
		});

		

		
	},


}