var express = require('express');
var router = express.Router();

var items = require('../controllers/items');

router.get('/series/:id', items.seriesIssues);

router.get('/search/:query', items.searchMarvel);

router.get('/subscriptions', function(req, res) {
    // get the user's collection of subscriptions
    Item.list(function(items) {
        res.status(200).json({items: "my collection"});
    }, function(err) {
        res.status(400).json(err);
    });
});

router.post('/subscriptions/:id', function(req, res) {
    // add a new item to a user's subscriptions
    res.status(201).json({items: "new item"});
});

router.put('/subscriptions/:id', function(req, res) {
    // edit an item in a user's subscriptions
    res.status(200).json({items: "updated"});
});

router.delete('/subscriptions/:id', function(req, res) {
    // delete an item in a user's subscriptions
    res.status(200).json({items: "deleted"});
});

module.exports = router;
