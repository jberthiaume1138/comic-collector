var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../app.js');

global.environment = 'test';

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Comic Collector', function() {
    it('should display the home page on get', function(done) {
        chai.request(app)
            .get('/')
            .end(function(err,res) {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });

    it('should display the collection page on get', function(done) {
        chai.request(app)
            .get('/collection')
            .end(function(error,response) {
                response.should.have.status(200);
                response.should.be.html;
                done();
            });
    });

    // it('should display the series page on get', function(done) {
    //     chai.request(app)
    //         .get('/series/20476')
    //         .end(function(error,response) {
    //             response.should.have.status(200);
    //             done();
    //         });
    // });

    it('should display the shopping page on get', function(done) {
        chai.request(app)
            .get('/shop')
            .end(function(error,response) {
                response.should.have.status(200);
                response.should.be.html;
                done();
            });
    });

    it('should display the search page on get', function(done) {
        chai.request(app)
            .get('/search')
            .end(function(error,response) {
                response.should.have.status(200);
                response.should.be.html;
                done();
            });
    });
});
