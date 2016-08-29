var express = require('express');
var app = express();

app.get('/', function(request, response) {
    response.send('Hello, everyone');
    response.status(200);
});

app.get('/collection', function(request,response) {
    response.send('This is my collection.');
    response.status(200);
});

app.get('/series', function(request,response) {
    response.send('Details for a series.');
    response.status(200);
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
