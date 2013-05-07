var mongoose = require('mongoose')
   , User2Task = mongoose.model("User2Task");

module.exports = {
	insertData: function(data){
		console.log(data)

			var user2Task = new User2Task({
				userName: data.userName,
				user:[{
					zd:  data.zd,
					fb:  data.fb,
				}],
				tasks:data.tasks
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

	findData: function(data, cb){
		User2Task.find({userName : data},function (err, userData) {
			 if (err) 
				console.log(err.message);
			else
				cb(userData);
		})
	} 
}