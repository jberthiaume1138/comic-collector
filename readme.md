##[Comic Collector](https://radiant-peak-89382.herokuapp.com)

####Comic Collector is a Node/Express/MongoDB application to help track a comic book collection.
The idea is simple - it can be difficult to keep track of single issues of a comic book series, and that difficulty increases exponentially with each additional series you follow. Comic Collector is meant to change that.

In its most basic form, once a user has an account, they can simply keep a basic collection of all the comic book series they read regularly. The stored data includes basic fields like the series' title, start year and most importantly, the official Marvel ID number. A user will be able to see the cover images for each of the issues in each series, with the most recent on top. The user's collection will also track which issues they already own and/or which they are missing based on availability at any given date.

Discovery is also key, and Comic Collector helps with that too. By simply entering a title name in the search field, the official Marvel public API is queried. Once a user finds the series they want to read, a single click adds it to their collection and issue tracking begins.

There are many, many more features under development and will be released in the coming months.

#####Version 0.1
https://radiant-peak-89382.herokuapp.com
######Release Notes:
- API version 0.1 complete. (Node, Express)
- Test suite complete. (Mocha, Chai)
- Very basic Front-End to verify all the basic functionality and testing. Express-handlebars
is used as the view engine in Express to display the application routes. Future
versions will make use of a more robust view system.

_Note: this only currently works with Marvel Comics titles._

###Technologies

This is an Express application built on Node.js. Data is stored in a MongoDB database ,
with Mongoose.js. Handlebars.js is used both as the Express view engine (express-handlebars)
and on the client side for rendering purposes.

Unit tests are accomplished with the Mocha test runner and the Chai assertion library. Custom data
is used to seed a test database kept sandboxed from both production and development databases. Additionally, Postman was used extensively to test the API interactively.

Gulp handles tasks which include automatically transpiling SASS stylesheets into CSS and pre-compiling the Handlebars templates for efficiency.


###API documentation

The API is RESTful and returns JSON data.
