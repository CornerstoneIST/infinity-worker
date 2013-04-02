var FreshBooks = require('../');

/* FreshBooks() initiates your connection to the FreshBooks API.

This requires your "API URL" and "Authentication Token". To get these variables 
open FreshBooks and goto My Account > FreshBooks API. */

var api_url = "https://cornerstoneist.freshbooks.com/api/2.1/xml-in"
  , api_token = "10d8cfaddff7dc9e986d33f2b266b637";
  
var freshbooks = new FreshBooks(api_url, api_token)
  , invoice = new freshbooks.Invoice();

/* To create an invoice, use the create method().

Assign all your properties directly to the invoice object and then execute 
create().
*/
 
invoice.client_id = 2;

invoice.lines.push({name: 'Test'
                  , unit_cost: '5.00'
                  , quantity: '5'
                  , type: 'Item'});

invoice.create(function(err, invoice) {
  if(err) { //returns if an error has occured, ie invoice_id doesn't exist.
    console.log(err);
  } else {
    console.log("Invoice Number:" + invoice.number);
  }
});