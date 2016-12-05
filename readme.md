##[Comic Collector](https://radiant-peak-89382.herokuapp.com)

####Comic Collector is a Node/Express/MongoDB API to help track a comic book collection.

#####version 0.1:
https://radiant-peak-89382.herokuapp.com
######Release Notes:
- API version 0.1 complete. (Node, Express)
- Test suite complete. (Mocha, Chai)
- Very basic Front-End to verify all the basic functionality and testing. Express-handlebars
is used as the view engine in Express to display the application routes. Future
versions will make use of a more robust view system.

_Note: this only currently works with Marvel Comics titles._


###API documentation

The API returns JSON data.


###Technologies

This is an Express application built on Node.js. Data is stored in a MongoDB database ,
with Mongoose.js. Handlebars.js is used both as the Express view engine (express-handlebars)
and on the client side for rendering purposes.

Unit tests are accomplished with the Mocha test runner and the Chai assertion library. Custom data
is used to seed a test database kept sandboxed from both production and development databases. Additionally Postman was used extensively to test the API interactively.

Gulp handles tasks which include automatically transpiling SASS stylesheets into CSS and pre-compiling the Handlebars templates for efficiency.
