var zd = require('../lib/client'),
    fs = require('fs');

var client = zd.createClient({
  username:  'jpogosyan@cornerstoneist.com',
  token:     'lK5fuxstO87o2Hh7ZDW5pdzO56FcdNH6xj6DiDkm',
  remoteUri: 'https://cornerstoneist.zendesk.com/api/v2'
});

client.tickets.list(function (err, statusList, body, responseList, resultList) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(body)[1];
  //console.log(JSON.stringify(body, null, 2, true));//will display all tickets
});