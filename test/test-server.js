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
            .end(function(error,response) {
                response.should.have.status(200);
                response.should.be.html;
                done();
            });
    });
});
