var express = require('express');
var app = express();

var crypto = require('crypto-js');

var unirest = require('unirest');

app.get('/', function(request, response) {
    response.send('Hello, everyone on Heroku');
    response.status(200);
});

app.get('/collection', function(request,response) {
    response.send('This is my collection.');
    response.status(200);
});

app.get('/series/:id', function(request,response) {
    // response.send('Details for a series.');
    // comment here 
    response.status(200);

    var pub = '41ac4a2096f2416eb7cc039c19a371b3';
    var priv = '37b4c45a10b08d114e19400a278f8fb52b9d0f79';

    var ts = new Date().getTime();

    var hash = crypto.MD5(ts + priv + pub).toString();

    console.log(hash);

    var url = 'http://gateway.marvel.com:80/v1/public/series/';
    var seriesId = request.params.id;

    var params = {  "apikey": pub,
                    "ts": ts,
                    "hash": hash
                };

    unirest.get(url + seriesId + '/comics')
            .qs(params)
            .end(function(data) {
                console.log(data.body);
                response.send(data.body);
            });
});

app.get('/shopping', function(request,response) {
    response.send('Shopping Trip');
    response.status(200);
});

app.get('/search', function(request,response) {
    response.send('Search for series here.');
    response.status(200);
});

// app.use(express.static('public'));

app.listen(process.env.PORT || 8080);



exports.app = app;
