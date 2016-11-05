var crypto = require('crypto-js');
var unirest = require('unirest');
var user = require('../db/models/user')

var pub = process.env.pub;
var priv = process.env.priv;

var ts = new Date().getTime();

var hash = crypto.MD5(ts + priv + pub).toString();

module.exports.usersList = function(req, res) {
    // gets a list of all the registered users
    user.find(function(err, users) {
        if (err) {
            res.json({err: "ERROR"});
            return;
        }
        res.json(users);
    });
};

module.exports.usersReadOne = function(req, res) {
    // gets a complete user object
    var id = req.params.id;
    user.findById({_id: id}, function(err, item) {
        res.json(item);
    });
};

// module.exports.subscriptions = function(req, res) {
//     // gets a user's subscriptions
//     var id = req.params.id;
//     user.find({_id: id}, function(err, item) {
//         res.json(item.subscriptions);
//     });
// };

module.exports.seriesIssues = function(req, res) {
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
                res.json(data.body);
            });
};

module.exports.searchMarvel = function(req, res) {
    // get search renderSearchResults
    var url = 'http://gateway.marvel.com:80/v1/public/series?titleStartsWith=';

    var query = req.params.query;

    var params = {  "apikey": pub,
                    "ts": ts,
                    "hash": hash
                };

    unirest.get(url + query + '&apikey=' + pub)
            .qs(params)
            .end(function(data) {
                res.json(data.body);
            });
};
