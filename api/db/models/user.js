var mongoose = require('mongoose');

var SubscriptionSchema = new mongoose.Schema({
    seriesid: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    startyear: {
        type: Number
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
    lastname: {
        type: String
    },
    subscriptions:
        [SubscriptionSchema]
});

var Subscription = mongoose.model('Subscription' , SubscriptionSchema);
module.exportrs = Subscription;

var User = mongoose.model('User', UserSchema);
module.exports = User;
