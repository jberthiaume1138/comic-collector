var user = require('../db/models/user')
var homer = require('../../test/data/homer.json');
var monty = require('../../test/data/monty.json');

exports.run = function(callback, errback) {
    user.create(homer, monty, function(err, items) {
        if(err) {
            errback(err);
            return;
        }
        callback(items);
    });
};

if (require.main === module) {
    require('./connect');
    exports.run(function() {
        var mongoose = require('mongoose');
        mongoose.disconnect();
    }, function(err) {
        console.error(err);
    });
}
