var zd = require('../lib/client'),
    fs = require('fs');

var client = zd.createClient({
  username:  'jpogosyan@cornerstoneist.com',
  token:     'lK5fuxstO87o2Hh7ZDW5pdzO56FcdNH6xj6DiDkm',
  remoteUri: 'https://cornerstoneist.zendesk.com/api/v2'
});

client.users.auth(function (err, req, result) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(JSON.stringify(result.verified, null, 2, true));
});
