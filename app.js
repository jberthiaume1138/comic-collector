var express = require('express');
var app = express();

app.get('/', function(request, response) {
    response.send('Hello, everyone');
    response.status(200);
});

// app.use(express.static('public'));

app.listen(process.env.PORT || 8080);

exports.app = app;
