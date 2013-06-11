var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

 var Project2TimeSchema = new Schema({
	taskID : {type:String, required:true},
	timeEntry:[{id:String, notes: String, hour:String}],
	

    //System timestamps of documents
	updated: {type: Date, default: Date.now},	
	created: {type: Date, default: Date.now},
})

  mongoose.model('Project2Time', Project2TimeSchema);
