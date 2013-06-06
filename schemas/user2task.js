var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var taskSchema = new Schema({
	name: {type:String, required:true},
	tagName: {type:String, required:true},
	rate: String,
	type: {type: String, enum: ['combine', 'custom', 'reset']},
	contractType: String,
	parent: String
});

var fieldsSchama = new Schema({
	name: {type:String, required:true},
	tagName: {type:String, required:true},
	type: {type: String, enum: ['input', 'list']},
});

var userSchema = new Schema({
	zd:{
		 subdomain: {type:String, required:true},
	     username: {type:String, required:true},
	     token: {type:String, required:true}
	 },
	 fb:{
	 	host: {type:String, required:true},
		token: {type:String, required:true}
	 },
   
});

var User2TaskSchema = new Schema({
	userName : {type:String, required:true},
	user: [userSchema],
	fields: [fieldsSchama],
	tasks: [taskSchema],
	 //User created timestamp
    userTS: Date,

    //System timestamps of documents
	updated: {type: Date, default: Date.now},	
	created: {type: Date, default: Date.now},
})

  mongoose.model('User2Task', User2TaskSchema);
