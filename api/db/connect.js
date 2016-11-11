var mongoose = require('mongoose');

// SIGINT emulation for Windows
var readLine = require ('readline');
if (process.platorm === 'win32') {
    var rl = readLine.createInterface ({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('SIGINT', function () {
        process.emit ('SIGINT');
    });
}

mongoose.Promise = global.Promise;

var environment = require('../../environment.js');
var config = require('./config.json');

var dbURI;
if(process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGOLAB_URI;
}
else {
    dbURI = config[environment].uri;
    console.log(dbURI);
}


mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

var gracefulShutdown;
// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});
