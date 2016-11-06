var crypto = require('crypto-js');
var unirest = require('unirest');
var user = require('../db/models/user')
// var subscription = require('../db/models/subscription');

var pub = process.env.pub;
var priv = process.env.priv;

var ts = new Date().getTime();

var hash = crypto.MD5(ts + priv + pub).toString();

var sendJSONResponse = function(res, status, content) {
    res.status(status);
    res.send(content);
};

module.exports.usersList = function(req, res) {
    // gets a list of all the registered users

    // user.find(function(err, users) {
    //     if (err) {
    //         res.json({err: "ERROR"});
    //         return;
    //     }
    //     res.json(users);
    // });

    // re-write using promises...exec() returns promise
    user.find()
        .exec()
        .then(function(users) {
            sendJSONResponse(res, 200, users);
        })
        .catch(function(err) {
            console.log(err);
        });
};

module.exports.usersCreate = function(req, res) {
    // create a new user
    sendJSONResponse(res, 201, {"status": "ADDED"});

    var promise = new Promise(function(resolve, reject) {
        resolve(user.create({username: 'jon'}, function(err, item) {
            console.log('Added', item);
        }));
    });

    promise.then(function(result) {
        sendJSONResponse(res, 201, result);
    }, function(err) {
        console.log('Failed!', err);
    });
};

module.exports.usersReadOne = function(req, res) {
    // gets a complete user object
    // if(req.params.id) {
    //     user.findById({_id: req.params.id}, function(err, item) {
    //         res.json(item);
    //     });
    // } else {
    //     sendJSONResponse(res, 400, {'message': 'No ID provided in request'});
    // }

    if(req.params.id) {
        user.findById(req.params.id)
            .exec()
            .then(function(users) {
                sendJSONResponse(res, 200, users);
            })
            .catch(function(err) {
                console.log(err);
                sendJSONResponse(res, 400, {'ERROR!': 'User ID not found'});
            });
    }
    else {
        sendJSONResponse(res, 400, {'ERROR!': 'No ID provided'});
    }
};

module.exports.usersUpdateOne = function(req, res) {
    // update a user
    sendJSONResponse(res, 200, {"status": "UPDATED"});
};

module.exports.usersDeleteOne = function(req, res) {
    // delete a user
    sendJSONResponse(res, 204, {"status": "REMOVED"});
};

// ---------

module.exports.subscriptionsList = function(req, res) {
    // list all of a users subscriptions
    var promise = new Promise(function(resolve, reject) {
        if(req.params) {
            user.findById(req.params.id, function(err, data) {
                if(!err) {
                    resolve(data);
                } else {
                    reject(err);
                }
            }).select('subscriptions');
        } else {
            sendJSONResponse(res, 400, {'message': 'No ID provided in request'});
        }
    });

    promise.then(function(result) {
        sendJSONResponse(res, 200, result.subscriptions);
    }, function(err) {
        console.log('Failed!', err);
    });

    // this works
    // user
    //     .findById(req.params.id)
    //     .select('subscriptions')
    //     .exec(function(err, data) {
    //         sendJSONResponse(res, 200, data.subscriptions);
    //     });
};

module.exports.subscriptionsCreate = function(req, res) {
    // create a new subscription for a user
    sendJSONResponse(res, 201, {"status": "ADDED"});
    //
    // if(req.params.id) {}
    //     var promise = new Promise(function(resolve, reject) {
    //         user.findById(req.params.id, function(err, data) {
    //             subscription.save
    //         });
    //     });
    // }
    // else {
    //     sendJSONResponse(res, 400, {'message': 'No ID provided in request'});
    // }
};

module.exports.subscriptionsReadOne = function(req, res) {
    // read a single subscription from a user

    // if(req.params.id && req.params.subscriptionid) {
    //     var promise = new Promise(function(resolve, reject) {
    //         user.findById(req.params.id, function(err, data) {
    //             if(!err) {
    //                 resolve(data.seriesid(req.params.subscriptionid));
    //             } else {
    //                 reject(err);
    //             }
    //         }).select('subscriptions');
    //     });
    //
    //     promise.then(function(result) {
    //         sendJSONResponse(res, 200, result.subscriptions);
    //     }, function(err) {
    //         console.log('Failed!', err);
    //     });
    // }
    // else {
    //     sendJSONResponse(res, 400, {'message': 'No ID provided in request'});
    // }


};

module.exports.subscriptionsUpdateOne = function(req, res) {
    // update a single subscription
    sendJSONResponse(res, 200, {"status": "UPDATED"});
};

module.exports.subscriptionsDeleteOne = function(req, res) {
    // delete a single subscription
    sendJSONResponse(res, 204, {"status": "REMOVED"});
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
