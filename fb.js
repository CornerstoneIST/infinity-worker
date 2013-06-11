var hogan = require('hogan.js'),
  	 fs = require('fs'),
  	 https = require('https');

var HEADER = {  
		  host: "",
		  path : "/api/2.1/xml-in",
		  port: 443,
		  auth: ":X",
		  method: 'POST',  
		  headers: {  
		    'Content-Type': 'application/x-www-form-urlencoded',  
		    'Content-Length': ""
		  }
		};

var CLIENT_TEMPLATE = fs.readFileSync('templates/client.create.xml', 'utf-8');
var CLIENT_LIST_TEMPLATE = fs.readFileSync('templates/client.list.xml', 'utf-8');
var INVOICE_TEMPLATE = fs.readFileSync('templates/invoice.create.xml', 'utf-8');
var PROJECT_LIST_TEMPLATE = fs.readFileSync('templates/project.list.xml', 'utf-8');
var PROJECT_TEMPLATE = fs.readFileSync('templates/create.project.xml', 'utf-8');
var PROJECT_UPDATE_TEMPLATE = fs.readFileSync('templates/project.update.xml', 'utf-8');
var TASK_LIST_TEMPLATE = fs.readFileSync('templates/task.list.xml', 'utf-8');
var TASK_TEMPLATE = fs.readFileSync('templates/create.task.xml', 'utf-8');
var TASK_UPDATE_TEMPLATE = fs.readFileSync('templates/task.update.xml', 'utf-8');
var TIME_ENTRY_TEMPLATE = fs.readFileSync('templates/time.entry.xml', 'utf-8');
var TIME_ENTRY_LIST_TEMPLATE = fs.readFileSync('templates/time.entry.list.xml', 'utf-8');


module.exports = {

	init : function(host, token){
		HEADER.host = host;
		HEADER.auth = token + ":X";
		return this;
	},

	createClient : function(data, next){
		var _client = hogan.compile(CLIENT_TEMPLATE).render(data);
		this.postFreshbook(_client, next);
	},
	clientList: function(data, next){
		var _client_list = hogan.compile(CLIENT_LIST_TEMPLATE).render(data);
		this.postFreshbook(_client_list, next);
	},
	createInvoice : function(data, next){
		var _invoice = hogan.compile(INVOICE_TEMPLATE).render(data);
		postFreshbook(_invoice, next);
	},
	projectList: function(data, next){
		var _project_list = hogan.compile(PROJECT_LIST_TEMPLATE).render(data);
		this.postFreshbook(_project_list, next);
	},
	createProject : function(data, next){
		var _project = hogan.compile(PROJECT_TEMPLATE).render(data);
		this.postFreshbook(_project, next);
	},
	projectUpdate : function(data, next){
		var _project_update = hogan.compile(PROJECT_UPDATE_TEMPLATE).render(data);
		this.postFreshbook(_project_update, next);
	},
	taskList: function(data, next){
		var _task_list = hogan.compile(TASK_LIST_TEMPLATE).render(data);
		this.postFreshbook(_task_list, next);
	},
	createTask : function(data, next){
		var _task = hogan.compile(TASK_TEMPLATE).render(data);
		this.postFreshbook(_task, next);
	},
	taskUpdate : function(data, next){
		var _task_update = hogan.compile(TASK_UPDATE_TEMPLATE).render(data);
		this.postFreshbook(_task_update, next);
	},
	createTimeEntry : function(data, next){
		var _time_entry = hogan.compile(TIME_ENTRY_TEMPLATE).render(data);
		this.postFreshbook(_time_entry, next);
	},
	timeEntryList : function(data, next){
		var _time_entry_list = hogan.compile(TIME_ENTRY_LIST_TEMPLATE).render(data);
		this.postFreshbook(_time_entry_list, next);
	},
	postFreshbook : function(xml, next){
		if (HEADER.host == "" || HEADER.auth == ":X"){
			next('init err');
			return;
		}
		if (!this){
			next('init err')
			return;
		}
		HEADER.headers['Content-Length'] = xml.length;

		var post_req = https.request(HEADER, function(res) {  
			res.setEncoding('utf8');  
			res.on('data', function (chunk) {  
				next(chunk);
			});
			res.on('error', function(e) {
				console.error(e);
				next('fail');
			});
		}); 
		post_req.write(xml);  
		post_req.end();
	}
};
