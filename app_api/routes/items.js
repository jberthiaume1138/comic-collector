var express = require('express');
var router = express.Router();

var items = require('../controllers/items');

router.get('/series/:id', items.seriesIssues);



router.get('/subscriptions', function(req,res) {
    // get the user's collection of
});

router.post('/subscriptions/:id', function(req, res) {
    // add a new item to a user's subscriptions
});

router.put('/subscriptions/:id', function(req, res) {
    // edit an item in a user's subscriptions
});

router.delete('/subscriptions/:id', function(req, res) {
    // edit an item in a user's subscriptions
});

module.exports = router;
