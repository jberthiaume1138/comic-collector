var express = require('express');
var router = express.Router();

var items = require('../controllers/items');

router.get('/', function(req, res) {
    res.render('home');
});

router.get('/collection', function(req, res) {
    res.render('collection');
});

router.get('/series/:id', items.renderSeries);

router.get('/shop', function(req,res) {
    res.render('shop');
});

router.get('/search', function(req,res) {
    res.render('search');
});

module.exports = router;
