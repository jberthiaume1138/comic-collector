var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');

global.environment = 'test';

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

var existingData = require('./data/homer.json');

describe('Comic Collector', function() {

    describe('Application', function() {

        it('should display the home page on GET', function(done) {
            chai.request(app)
                .get('/')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                });
        });

        it('should display the collection page on GET', function(done) {
            chai.request(app)
                .get('/collection/' + existingData._id)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                });
        });

        it('should display the shopping page on GET', function(done) {
            chai.request(app)
                .get('/shop')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                });
        });

        it('should display the search page on GET', function(done) {
            chai.request(app)
                .get('/search')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                });
        });
    });

    describe('API', function() {
        // it('should display the series page on get', function(done) {
        //     this.timeout(4000);
        //     chai.request(app)
        //         .get('/api/series/20617')
        //         .end(function(error, res) {
        //             res.should.have.status(200);
        //             res.should.be.json;
        //             res.body.should.be.a('object');
        //             res.body.should.have.property('data');
        //             res.body.data.should.have.property('results');
        //             res.body.data.results.should.be.a('array');
        //             res.body.data.results[0].should.have.property('id');
        //             res.body.data.results[0].id.should.equal(56159);
        //             done();
        //         });
        // });

        it('should display a list of users on GET', function(done) {
            chai.request(app)
                .get('/api/users')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body[0].should.be.a('object');
                    res.body[0].should.have.property('_id');
                    res.body[0]._id.should.be.a('string');
                    res.body[0].should.have.property('username');
                    res.body[0].username.should.be.a('string');
                    res.body[0].username.should.equal('homer');
                    res.body[0].should.have.property('firstname');
                    res.body[0].firstname.should.be.a('string');
                    res.body[0].firstname.should.equal('Homer');
                    res.body[0].should.have.property('lastname');
                    res.body[0].lastname.should.be.a('string');
                    res.body[0].lastname.should.equal('Simpson');
                    res.body[0].should.have.property('password');
                    res.body[0].should.have.property('subscriptions');
                    res.body[0].subscriptions.should.be.a('array');
                    res.body[0].subscriptions[0].should.be.a('object');
                    res.body[0].subscriptions[0].should.have.property('seriesid');
                    res.body[0].subscriptions[0].seriesid.should.be.a('number');
                    res.body[0].subscriptions[0].seriesid.should.equal(20617);
                    res.body[0].subscriptions[0].should.have.property('title');
                    res.body[0].subscriptions[0].title.should.be.a('string');
                    res.body[0].subscriptions[0].title.should.equal('Old Man Logan');
                    res.body[0].subscriptions[0].should.have.property('startyear');
                    res.body[0].subscriptions[0].startyear.should.be.a('number');
                    res.body[0].subscriptions[0].startyear.should.equal(2016);
                    res.body[0].subscriptions[0].should.have.property('inprogress');
                    res.body[0].subscriptions[0].inprogress.should.be.a('Boolean');
                    res.body[0].subscriptions[0].inprogress.should.equal(true);
                    done();
                });
        });

        // it('should add a new user on POST', function(done) {
        //     chai.request(app)
        //         .get('/api/users')       // verify dummy user data parameter
        //         .send({'username':'frink', 'firstname':'Professor'})
        //         .end(function(error, res) {
        //             res.should.have.status(201);
        //             res.should.be.json;
        //             res.body.should.have.property('username');
        //             res.body.username.should.equal('frink');
        //             done();
        //         });
        // });

        it('should display a single user on GET', function(done) {
            chai.request(app)
                .get('/api/users/' + existingData._id)
                .end(function(error, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('_id');
                    res.body._id.should.be.a('string');
                    res.body._id.should.equal(existingData._id);
                    res.body.should.have.property('username');
                    res.body.username.should.be.a('string');
                    res.body.username.should.equal('homer');
                    res.body.should.have.property('firstname');
                    res.body.firstname.should.be.a('string');
                    res.body.firstname.should.equal('Homer');
                    res.body.should.have.property('lastname');
                    res.body.lastname.should.be.a('string');
                    res.body.lastname.should.equal('Simpson');
                    res.body.should.have.property('subscriptions');
                    res.body.subscriptions.should.be.a('array');
                    res.body.subscriptions[0].should.be.a('object');
                    res.body.subscriptions[0].should.have.property('seriesid');
                    res.body.subscriptions[0].seriesid.should.be.a('number');
                    res.body.subscriptions[0].seriesid.should.equal(20617);
                    res.body.subscriptions[0].should.have.property('title');
                    res.body.subscriptions[0].title.should.be.a('string');
                    res.body.subscriptions[0].title.should.equal('Old Man Logan');
                    res.body.subscriptions[0].should.have.property('startyear');
                    res.body.subscriptions[0].startyear.should.be.a('number');
                    res.body.subscriptions[0].startyear.should.equal(2016);
                    res.body.subscriptions[0].should.have.property('inprogress');
                    res.body.subscriptions[0].inprogress.should.be.a('Boolean');
                    res.body.subscriptions[0].inprogress.should.equal(true);
                    res.body.subscriptions[1].should.have.property('seriesid');
                    res.body.subscriptions[1].seriesid.should.be.a('number');
                    res.body.subscriptions[1].seriesid.should.equal(19711);
                    res.body.subscriptions[1].should.have.property('title');
                    res.body.subscriptions[1].title.should.be.a('string');
                    res.body.subscriptions[1].title.should.equal('Han Solo');
                    res.body.subscriptions[1].should.have.property('startyear');
                    res.body.subscriptions[1].startyear.should.be.a('number');
                    res.body.subscriptions[1].startyear.should.equal(2016);
                    res.body.subscriptions[1].should.have.property('inprogress');
                    res.body.subscriptions[1].inprogress.should.be.a('Boolean');
                    res.body.subscriptions[1].inprogress.should.equal(false);
                    res.body.subscriptions[2].should.have.property('seriesid');
                    res.body.subscriptions[2].seriesid.should.be.a('number');
                    res.body.subscriptions[2].seriesid.should.equal(20476);
                    res.body.subscriptions[2].should.have.property('title');
                    res.body.subscriptions[2].title.should.be.a('string');
                    res.body.subscriptions[2].title.should.equal('Invincible Iron Man');
                    res.body.subscriptions[2].should.have.property('startyear');
                    res.body.subscriptions[2].startyear.should.be.a('number');
                    res.body.subscriptions[2].startyear.should.equal(2015);
                    res.body.subscriptions[2].should.have.property('inprogress');
                    res.body.subscriptions[2].inprogress.should.be.a('Boolean');
                    res.body.subscriptions[2].inprogress.should.equal(true);
                    done();
                });
        });

        // it('should update a single user on PUT', function(done) {
        //     chai.request(app)
        //         .put('/api/users/' + ExistingUserID)
        //         .send(testUpdateData)
        //         .end(function(err, res) {
        //             done();
        //         });
        // });

        // it('should remove a single user on DELETE', function(done) {
        //     chai.reques(app)
        //         .delete('/api/users/' + existingData._id)
        //         .end(function(err, res) {
        //             done();
        //         });
        // });

        // sub document testing - subscriptions -------------------------------------------------

        it('should list all of a users subscriptions on GET', function(done) {
            chai.request(app)
                .get('/api/users/' + existingData._id + '/subscriptions')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body[0].should.be.a('object');
                    res.body[0].should.have.property('seriesid');
                    res.body[0].seriesid.should.be.a('number');
                    res.body[0].seriesid.should.equal(20617);
                    res.body[0].should.have.property('title');
                    res.body[0].title.should.be.a('string');
                    res.body[0].title.should.equal('Old Man Logan');
                    res.body[0].should.have.property('startyear');
                    res.body[0].startyear.should.be.a('number');
                    res.body[0].startyear.should.equal(2016);
                    res.body[0].should.have.property('inprogress');
                    res.body[0].inprogress.should.be.a('Boolean');
                    res.body[0].inprogress.should.equal(true);
                    res.body[1].should.be.a('object');
                    res.body[1].should.have.property('seriesid');
                    res.body[1].seriesid.should.be.a('number');
                    res.body[1].seriesid.should.equal(19711);
                    res.body[1].should.have.property('title');
                    res.body[1].title.should.be.a('string');
                    res.body[1].title.should.equal('Han Solo');
                    res.body[1].should.have.property('startyear');
                    res.body[1].startyear.should.be.a('number');
                    res.body[1].startyear.should.equal(2016);
                    res.body[1].should.have.property('inprogress');
                    res.body[1].inprogress.should.be.a('Boolean');
                    res.body[1].inprogress.should.equal(false);
                    res.body[2].should.be.a('object');
                    res.body[2].should.have.property('seriesid');
                    res.body[2].seriesid.should.be.a('number');
                    res.body[2].seriesid.should.equal(20476)
                    res.body[2].should.have.property('title');
                    res.body[2].title.should.be.a('string');
                    res.body[2].title.should.equal('Invincible Iron Man');
                    res.body[2].should.have.property('startyear');
                    res.body[2].startyear.should.be.a('number');
                    res.body[2].startyear.should.equal(2015);
                    res.body[2].should.have.property('inprogress');
                    res.body[2].inprogress.should.be.a('Boolean');
                    res.body[2].inprogress.should.equal(true);
                    done();
                });
        });

        // it('should add a new item to the user subscriptions on POST', function(done) {
        //     chai.request(app)
        //         .post('/api/subscriptions/homer')      // insert parameters...
        //         .end(function(error, res) {
        //             res.should.have.status(200);
        //             res.should.be.json;
        //             done();
        //         });
        // });
        //
        // it('should edit an item in the user subscriptions on PUT', function(done) {
        //     chai.request(app)
        //         .put('/api/subscriptions/homer')      // insert parameters...
        //         .end(function(error, res) {
        //             res.should.have.status(200);
        //             res.should.be.json;
        //             done();
        //         });
        // });
        //
        // it('should delete an item from the subscriptions on DELETE', function(done) {
        //     chai.request(app)
        //         .delete('/api/subscriptions/homer')      // insert parameters...
        //         .end(function(error, res) {
        //             res.should.have.status(200);
        //             res.should.be.json;
        //             done();
        //         });
        // });
    });
});
