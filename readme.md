##Comic Collector

####Comic Collector is a Node/Express/MongoDB application to help track a comic book collection.

version 0.1:
https://radiant-peak-89382.herokuapp.com

_Note: this only currently works with Marvel Comics titles._


###API documentation

The API returns JSON data on all routes.

###Technologies

This is an Express application built on Node.js. Data is stored in a MongoDB database,
with Mongoose.js. Handlebars.js is used both as the Express view engine (express-handlebars)
and on the client side for some rendering purposes.

Unit tests are accomplished with the Mocha test runner and the Chai assertion library. Custom data
is used to seed a test database kept sandboxed from both production and development databases.

Gulp handles tasks which include automatically transpiling SASS stylesheets into CSS and pre-compiling
the Handlebars templates for efficiency.
