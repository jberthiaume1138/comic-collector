var mongoose = require('mongoose');

var SubscriptionSchema = new mongoose.Schema({
    seriesid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    startdate: {
        type: Date
    },
    inprogress: {
        type: Boolean,
        "default": true
    }
});

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String
    },
    subscriptions: {
        [SubscriptionSchema]
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
