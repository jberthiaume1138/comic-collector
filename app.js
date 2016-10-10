var express = require('express');
var app = express();

var util = require('util');
var path = require('path');

var staticPath = path.join(__dirname,'public');

app.use(express.static(staticPath));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var routes = require('./app_server/routes/routes');
var apiRoutes = require('./app_api/routes/items');

app.use('/', routes);
app.use('/api', apiRoutes);

app.use('*', function(req, res) {
    res.send('Error 404 - page not found!');
    res.status(404);
});

app.listen(process.env.PORT || 8080);
util.log("... application started ...");

module.exports = app;
