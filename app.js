var express = require('express');
var app = express();

var util = require('util');
var path = require('path');

var crypto = require('crypto-js');
var unirest = require('unirest');

if (!process.env.priv) {
    var env = require('./env.js');
}

var staticPath = path.join(__dirname,'public');
app.use(express.static(staticPath));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
    res.render('home');
    res.status(200);
});

app.get('/collection', function(req, res) {
    res.render('collection');
    res.status(200);
});

app.get('/series/:id', function(req,res) {
    var pub = process.env.pub;
    var priv = process.env.priv;

    var ts = new Date().getTime();

    var hash = crypto.MD5(ts + priv + pub).toString();

    var url = 'http://gateway.marvel.com:80/v1/public/series/';
    var seriesId = req.params.id;

    var params = {  "apikey": pub,
                    "ts": ts,
                    "hash": hash
                };

    unirest.get(url + seriesId + '/comics')
            .qs(params)
            .end(function(data) {
                res.render('series', data.body);
                console.log(data.body);
                // res.json(data.body);
                res.status(200);
            });
});

app.get('/shop', function(req,res) {
    res.render('shop');
    res.status(200);
});

app.get('/search', function(req,res) {
    res.render('search');
    res.status(200);
});

app.listen(process.env.PORT || 8080);
util.log("... application started ...");

exports.app = app;
