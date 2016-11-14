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

    user.find().exec()
        .then(function(users) {
            sendJSONResponse(res, 200, users);
        })
        .catch(function(err) {
            console.log(err);
            sendJSONResponse(res, 404, {message: 'ERROR! Cannot find any users. '});
        });
};

module.exports.usersCreate = function(req, res) {
    // create a new user

    var dataToAdd = {};
    for (var field in req.body) {
        dataToAdd[field] = req.body[field];
    }

    user.create(dataToAdd)
        .then(function(data) {
            sendJSONResponse(res, 201, {'ADDED': data});
        })
        .catch(function(err) {
            console.log(err);
        });
};

module.exports.usersReadOne = function(req, res) {
    // gets a complete user object
    if(req.params.userid) {
        user.findById(req.params.userid).exec()
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
    var userID = req.params.userid;

    var set = {};
    for (var field in req.body) {
        set[field] = req.body[field];
    }

    var options = {new: true};

    user.findByIdAndUpdate(userID, {$set: set}, options)
        .then(function(data) {
            sendJSONResponse(res, 200, {'UPDATED': data});
        })
        .catch(function(err) {
            console.log(err);
        });
};

module.exports.usersDeleteOne = function(req, res) {
    // delete a user
    var userID = req.params.userid;

    user.findByIdAndRemove(userID)
        .then(function(data) {
            sendJSONResponse(res, 200, {'REMOVED': data});
        })
        .catch(function(err) {
            console.log(err);
        });
};

// --------------------------------------------------------------------------------

module.exports.subscriptionsList = function(req, res) {
    // list all of a users subscriptions
    if(req.params.userid) {
        user.findById(req.params.userid)
            .select('subscriptions')
            .exec()
            .then(function(subs) {
                sendJSONResponse(res, 200, subs.subscriptions);
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

module.exports.subscriptionsCreate = function(req, res) {
    // create a new subscription for a user

    var newSub = {};
    for (var field in req.body) {
        newSub[field] = req.body[field];
    }

    // as response, send the entire user or
        // or just the updated sub-document array
        // or the new data object?

    user.findById(req.params.userid)
        .then(function(thisUser) {
            thisUser.subscriptions.push(newSub);
            return thisUser;
        })
        .then(function(thisUser) {
            thisUser.save(function(err, newUser) {
                if(err) {
                    return(err);
                }
                else {
                    sendJSONResponse(res, 201, newUser);
                }
            });
        })
        .catch(function(err) {
            console.log(err);
        });
};

module.exports.subscriptionsReadOne = function(req, res) {
    // read a single subscription from a user
    if(req.params.userid) {
        user.findById(req.params.userid).exec()
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

module.exports.subscriptionsUpdateOne = function(req, res) {
    // update a single subscription

    var userToUpdateId = req.params.userid;
    var subToUpdateId = req.params.subscriptionid;

    user.findById(userToUpdateId).exec()
        // .select('subscriptions')        // do not NEED this, but reduces the amount of data over the wire
        .then(function(thisUser) {
            var thisSub = thisUser.subscriptions.id(subToUpdateId);   // find the subscription - .id() built in method

            for (var field in req.body) {
                thisSub[field] = req.body[field];
            }

            thisUser.save(thisSub, function(err, updatedUser) {
                if(err) {
                    return err;
                }
                sendJSONResponse(res, 200, {'UPDATED': updatedUser});
            });
        })
        .catch(function(err) {
            console.log(err);
            sendJSONResponse(res, 404, {"ERROR updating!": err});
        });
};

module.exports.subscriptionsDeleteOne = function(req, res) {
    // delete a single subscription
    user.findById(req.params.userid).exec()
        .then(function(thisUser) {
            var subToRemove = thisUser.subscriptions.id(req.params.subscriptionid);
            subToRemove.remove();

            thisUser.save(function(err, updatedUser) {
                if(err) {
                    return err;
                }
                sendJSONResponse(res, 200, {'REMOVED': subToRemove});    // or send the whole user?
            })
        })
        .catch(function(err) {
            console.log(err);
            sendJSONResponse(res, 404, {"ERROR removing!": err});
        });
};




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
