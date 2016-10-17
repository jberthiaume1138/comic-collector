var unirest = require('unirest');
var crypto = require('crypto-js');

module.exports.renderSeries = function(req, res) {
    // gets the complete run of a series from Marvel's API

    // var pub = process.env.pub;
    // var priv = process.env.priv;
    //
    // var ts = new Date().getTime();
    //
    // var hash = crypto.MD5(ts + priv + pub).toString();
    //
    // var url = 'http://gateway.marvel.com:80/v1/public/series/';
    // var seriesId = req.params.id;
    //
    // var params = {  "apikey": pub,
    //                 "ts": ts,
    //                 "hash": hash
    //             };
    //
    // unirest.get(url + seriesId + '/comics')
    //         .qs(params)
    //         .end(function(data) {
    //             res.render('series', data.body);
    //         });

    // **** temp hard coding data for a series ****
    var logan = require('../data/logan.json');
    res.render('series', logan);
};

module.exports.renderCollection = function(req, res) {
    // get a user's collection from the application database
};
