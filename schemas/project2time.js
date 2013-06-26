var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

 var Project2TimeSchema = new Schema({
	projectID : {type:String, required:true},
	timeEntry:[{id:String, notes: String, hour:String, startTime:String, endTime:String, taskId:String,taskName:String, date: String}],
	

    //System timestamps of documents
	updated: {type: Date, default: Date.now},	
	created: {type: Date, default: Date.now},
})
 
 mongoose.model('Project2Time', Project2TimeSchema);

  var AutoTimeEntrySchema = new Schema({
    userEmail: {type:String},
  	ticketID : {type:String},
  	notes : {type:String},
    startTime:{type:String},
  	fields:[{tagName:String, taskName:String}],
  	date:{type:String},
  	updated: {type: Date, default: Date.now},	
  	created: {type: Date, default: Date.now},

  })

 mongoose.model('AutoTimeEntry', AutoTimeEntrySchema);