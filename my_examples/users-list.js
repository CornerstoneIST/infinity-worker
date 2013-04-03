var zd = require('../lib/zendesk'),
    fs = require('fs');

var client = zd.createClient({
  username:  'jpogosyan@cornerstoneist.com',
  token:     'lK5fuxstO87o2Hh7ZDW5pdzO56FcdNH6xj6DiDkm',
  remoteUri: 'https://cornerstoneist.zendesk.com/api/v2'
});

client.users.list(function (err, req, result) {
  if (err) {
    console.log(err);
    return;
  }
  //console.log(JSON.stringify(result.map(function (user) {return user.name;}), null, 2, true));//gets the first page
  console.log(result.map(function (user) {return user.name;}));
  console.log(result.map(function (user) {return user.email;}));
  console.log("Total Users: "+result.length);
});