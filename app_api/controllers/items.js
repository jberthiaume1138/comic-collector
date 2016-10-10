var crypto = require('crypto-js');
var unirest = require('unirest');

module.exports.seriesIssues = function(req, res) {

    if (!process.env.priv) {
        var env = require('../../env.js');
    }

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
                console.log(data.body);         // remove later
                res.json(data.body);
            });
};
