var express = require('express');
var router = express.Router();

var items = require('../controllers/items');

router.get('/', function(req, res) {
    res.render('home');
});

router.get('/collection', items.renderCollection);

router.get('/series/:id', items.renderSeries);

router.get('/search', function(req,res) {
    res.render('search');
});

router.get('/search/:query', items.renderSearchResults);

router.get('/shop', function(req,res) {
    res.render('shop');
});

module.exports = router;
