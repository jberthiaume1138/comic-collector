var unirest = require('unirest');
var crypto = require('crypto-js');

var pub = process.env.pub;
var priv = process.env.priv;

var ts = new Date().getTime();

var hash = crypto.MD5(ts + priv + pub).toString();

var request = require('request');

if(process.env.NODE_ENV === 'production') {
    var baseURL = 'https://radiant-peak-89382.herokuapp.com';
}
else {
    var baseURL = 'http://localhost:8080';
}


module.exports.renderAdmin = function(req, res) {
    // gets the list of registered users and their collections
    var requestOptions = {
        url: baseURL + '/api/users',
        method: 'GET',
        json: {}
    };
    request(requestOptions, function(err, response, body) {
        if(err) {
            console.log(err);
        }
        else if(response.statusCode === 200) {
            console.log(body);
            res.render('admin', body);
        }
        else {
            console.log(response.statusCode);
        }
    });
};

module.exports.renderSeries = function(req, res) {
    // gets the complete run of a series from Marvel's API

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
            });

    // **** temp hard coding data for a series ****
    // **** remove the below and un comment everything above ***
    // var logan = require('../data/logan.json');
    // res.render('series', logan);
};

module.exports.renderSubscriptions = function(req, res) {
    // get a user's collection from the application database

    var user = req.params.userid;

    if(!user) {
        console.log('User not logged in');
        res.render('unauthorized');
    }
    else {
        var requestOptions = {
            url: baseURL + '/api/users/' + user,
            method: 'GET',
            json: {}
        };


        request(requestOptions, function(err, response, body) {
            if(err) {
                console.log(err);
            }
            else if(response.statusCode === 200) {
                res.render('subscriptions', body);
            }
            else {
                console.log(response.statusCode);
            }
        });
    }
};
