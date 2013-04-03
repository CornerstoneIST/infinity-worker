var FreshBooks = require('../lib');


/* FreshBooks() initiates your connection to the FreshBooks API.

This requires your "API URL" and "Authentication Token". To get these variables 
open FreshBooks and goto My Account > FreshBooks API. */

var api_url = "https://cornerstoneist.freshbooks.com/api/2.1/xml-in"
  , api_token = "10d8cfaddff7dc9e986d33f2b266b637";
  
var freshbooks = new FreshBooks(api_url, api_token)
  , invoice = new freshbooks.Invoice();

/* To list invoices, use the list() method.

The first argument takens an array of any API options you want to pass on and 
the second is a callback to be executed when the method has completed. 
*/
 
invoice.list(function(err, invoices, options) {
  if(err) { //returns if an error has occured, ie invoice_id doesn't exist.
    console.log(err);
  } else {
    console.log(options);
    invoices.forEach(function(invoice) {
     // console.log("Invoice Number:" + invoice.number);
      console.log(invoice);
     // var nameLines = invoice.lines[0];
     // console.log(nameLines.name);
    });
  }
});