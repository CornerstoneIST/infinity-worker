var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

 var Project2TimeSchema = new Schema({
	projectID : {type:String, required:true},
	timeEntry:[{id:String, notes: String, hour:String, startTime:String, endTime:String, taskId:String,taskName:String}],
	

    //System timestamps of documents
	updated: {type: Date, default: Date.now},	
	created: {type: Date, default: Date.now},
})
 
 mongoose.model('Project2Time', Project2TimeSchema);

  var AutoTimeEntrySchema = new Schema({

  	taskID : {type:String},
  	notes : {type:String},
    startTime:{type:String},
  	taskName:{type:String},
  	
  	updated: {type: Date, default: Date.now},	
  	created: {type: Date, default: Date.now},

  })

 mongoose.model('AutoTimeEntry', AutoTimeEntrySchema);