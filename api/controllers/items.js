var crypto = require('crypto-js');
var unirest = require('unirest');
var request = require('request');

var user = require('../db/models/user')

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

    // username input validation
    if(!req.body) {
        sendJSONResponse(res, 400, {message:'No request body'});
        return;
    }

    if(!('username' in req.body)) {
        sendJSONResponse(res, 422, {message: 'Missing field: username'});
        return;
    }

    var username = req.body.username;

    if (typeof username !== 'string') {
        sendJSONResponse(res, 422, {message: 'Incorrect field type: username'});
        return
    }

   username = username.trim();

   if (username === '') {
       sendJSONResponse(res, 422, {message: 'Incorrect field length: username'});
       return;
   }

   // password input validation
   if (!('password' in req.body)) {
       sendJSONResponse(res, 422, {message: 'Missing field: password'});
       return;
   }

   var password = req.body.password;

   if (typeof password !== 'string') {
       sendJSONResponse(res, 422, {message: 'Incorrect field type: password'});
       return;
   }

   password = password.trim();

   if (password === '') {
       sendJSONResponse(res, 422, {message: 'Incorrect field length: password'});
       return;
   }


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

    user.findById(req.params.userid)
        .then(function(thisUser) {
            thisUser.subscriptions.push(newSub);
            return thisUser;
        })
        .then(function(thisUser) {
            thisUser.save(function(err, updatedUser) {
                if(err) {
                    return(err);
                }
                else {
                    sendJSONResponse(res, 201, {'ADDED': newSub});
                }
            });
        })
        .catch(function(err) {
            console.log(err);
            sendJSONResponse(res, 404, {'ERROR adding subscription': err});
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

            // for (var key in req.body) {
            //     console.log(key, req.body[key]);
            // }

            thisUser.save(thisSub, function(err, updatedUser) {
                if(err) {
                    console.log(err);
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
                sendJSONResponse(res, 200, {'REMOVED': subToRemove});
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

    // var requestOptions = {
    //     url: baseURL + seriesId + '/comics',
    //     method: 'GET,'
    //     json: {}
    // };
    //
    // request(requestOptions, function(err, response, body) {
    //     if(err) {
    //         console.log(err);
    //     }
    //     else if (response.statusCode === 200) {
    //             res.json(body);
    //         }
    //     }
    //     else {
    //         console.log(response.statusCode);
    //     }
    // });
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
