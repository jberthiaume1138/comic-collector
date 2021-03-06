require('./api/db/connect');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var util = require('util');
var path = require('path');

app.use(bodyParser.json());

var staticPath = path.join(__dirname,'public');
app.use(express.static(staticPath));

var viewsPath = path.join(__dirname,'app_server','views');
app.set('views', viewsPath);

var moment = require('moment');
var exphbs = require('express-handlebars');

var hbs = exphbs.create({
    helpers: {
        dateTimeFormat: function(date, format) {
            return moment(date).format(format);
        },
        filter: function(array, arg) {
            var result = array.filter(function(item) {
                if(item.type == arg) {
                    return item.date;
                }
            });
            console.log(result);
            return result[0].date;
        }
    },
    layoutsDir: viewsPath + '/layouts',
    partialsDir: viewsPath + '/partials',
    defaultLayout: 'main'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

var routes = require('./app_server/routes/routes');
var apiRoutes = require('./api/routes/items');

app.use('/', routes);

app.use('/api', apiRoutes);

app.use('*', function(req, res) {
    res.send('Error 404 - page not found!');
    res.status(404);
});

app.listen(process.env.PORT || 8080);
util.log("... application started ...");

exports.app = app;
