var zd = require('../lib/client'),
    fs = require('fs'),
    subdomain = 'cornerstoneist1364586789',
    username  = 'admin@cornerstoneist.com',
    token     = 'lK5fuxstO87o2Hh7ZDW5pdzO56FcdNH6xj6DiDkm';

var client = zd.createClient({
  username:  username,
  token:     token,
  remoteUri: 'https://'+subdomain+'.zendesk.com/api/v2'
});

var newTriger= {
     "trigger": {
       "title": "Notify Ticket update",
       "conditions": {
         "all": [
         ],
         "any": [
          { "field": "update_type", "value": "Created " },
           { "field": "update_type", "value": "Updated " },
         ]
       },

       "actions": [
         { "field": "notification_target", "value": "20035221" }
       ]
     }
   };
client.triggers.create(newTriger,function(err, statusList, body, responseList, resultList){

 if (err) {
    console.log(err);
    return;
  }

  console.log(JSON.stringify(body, null, 2, true));//will display all tickets
})

client.triggers.activeTrigers(function(err, statusList, body, responseList, resultList){

 if (err) {
    console.log(err);
    return;
  }

  console.log(JSON.stringify(body, null, 2, true));//will display all tickets
})
