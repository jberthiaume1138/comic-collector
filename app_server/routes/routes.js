var express = require('express');
var router = express.Router();

var items = require('../controllers/items');

router.get('/', function(req, res) {
    res.render('home');
});

router.get('/collection', items.renderCollection);
router.get('/collection/:userid', items.renderCollection);

router.get('/series/:id', items.renderSeries);

router.get('/search', function(req,res) {
    res.render('search');
});

router.get('/shop', function(req, res) {
    res.render('shop');
});

router.get('/admin', items.renderAdmin);



module.exports = router;
