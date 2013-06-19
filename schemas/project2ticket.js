var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

 var Project2TicketSchema = new Schema({
	ticketID : {type:String, required:true},
	projectID: {type:String, required:true},
	tasks:[{ID:String}],

    //System timestamps of documents
	updated: {type: Date, default: Date.now},	
	created: {type: Date, default: Date.now},
})
 
 mongoose.model('Project2Ticket', Project2TicketSchema);