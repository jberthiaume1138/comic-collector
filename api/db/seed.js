var user = require('../db/models/user')
var homer = require('../../test/data/homer.json');
var monty = require('../../test/data/monty.json');

exports.loadTestData = function(callback, errback) {
    user.create(homer, monty, function(err, items) {
        if(err) {
            errback(err);
            return;
        }
        callback(items);
    });
};
