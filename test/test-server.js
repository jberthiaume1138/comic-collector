var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');

global.environment = 'test';

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Comic Collector', function() {
    
    describe('Application', function() {
        it('should display the home page on get', function(done) {
            chai.request(app)
                .get('/')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                });
        });

        it('should display the collection page on get', function(done) {
            chai.request(app)
                .get('/collection')
                .end(function(error, response) {
                    response.should.have.status(200);
                    response.should.be.html;
                    done();
                });
        });

        it('should display the shopping page on get', function(done) {
            chai.request(app)
                .get('/shop')
                .end(function(error, response) {
                    response.should.have.status(200);
                    response.should.be.html;
                    done();
                });
        });

        it('should display the search page on get', function(done) {
            chai.request(app)
                .get('/search')
                .end(function(error, response) {
                    response.should.have.status(200);
                    response.should.be.html;
                    done();
                });
        });
    });

    describe('API', function() {
        it('should display the series page on get', function(done) {
            this.timeout(4000);
            chai.request(app)
                .get('/api/series/20617')
                .end(function(error, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('results');
                    res.body.data.results.should.be.a('array');
                    res.body.data.results[0].should.have.property('id');
                    res.body.data.results[0].id.should.equal(56159);
                    done();
                });
        });
    });

    // it('should display the user collection on get', function(done) {
    //     chai.request(app)
    //         .get('/api/collection/PARAM')     //add dummy user data param
    //         .end(function(error, res) {
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             .done();
    //         });
    // });
});
