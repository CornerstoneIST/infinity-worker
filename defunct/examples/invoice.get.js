var FreshBooks = require('../');

/* FreshBooks() initiates your connection to the FreshBooks API.

This requires your "API URL" and "Authentication Token". To get these variables 
open FreshBooks and goto My Account > FreshBooks API. */

var api_url = "https://cornerstoneist.freshbooks.com/api/2.1/xml-in"
  , api_token = "10d8cfaddff7dc9e986d33f2b266b637";
  
var freshbooks = new FreshBooks(api_url, api_token)
  , invoice = new freshbooks.Invoice();

/* To get an invoice, use the get() method.

The first argument is the invoice_id (not to be confused with the number) and 
the second is a callback to be executed when the method has completed. 
*/


/* The first argument is also optional on most methods meaning you can do this:
*/

invoice.invoice_id = 00000337124;
invoice.get(function(err, invoice) {
  console.log("Invoice Number:" + invoice.number);
});

