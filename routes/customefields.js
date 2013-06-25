var events = require('./events.js');
module.exports ={
	getCustomeFields: function(req,res){
		events.findData(req.query.unserName,function(data){

			var fields = data[0].fields;
			var tasks = data[0].tasks;


		  	var newfields=[];

		  	for(var i = 0; i < fields.length; i++){
		  		
		  			var customFieldOptions = [];
		  			for (var j=0; j < tasks.length; j++){
		  				if(tasks[j].parent == fields[i].tagName){
		  					customFieldOptions.push(tasks[j]);
		  				}
		  			}
		  			newfields.push({field:fields[i], options: customFieldOptions});
		  		
		  	}

		  	res.send(newfields);

		})
	}
}