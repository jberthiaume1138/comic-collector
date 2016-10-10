var crypto = require('crypto-js');
var unirest = require('unirest');

module.exports.collection = function(req, res) {
    // gets a user's collection - ie a list of subscribed series
    // this comes from the MongoDB
};

module.exports.seriesIssues = function(req, res) {
    // gets the complete run of a series from Marvel's API
    // if (!process.env.priv) {
    //     var env = require('../../env.js');
    // }

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
                res.json(data.body);
            });
};
