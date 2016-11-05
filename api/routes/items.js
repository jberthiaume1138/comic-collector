var express = require('express');
var router = express.Router();

var items = require('../controllers/items');

router.get('/series/:id', items.seriesIssues);

router.get('/search/:query', items.searchMarvel);



router.get('/users', items.usersList);    //admin only route

router.get('/users/:id', items.usersReadOne);

// router.get('/users/:id/subscriptions', items.subscriptions);

router.post('/users/:id/subscriptions/:id', function(req, res) {
    // add a new item to a user's subscriptions
    res.status(201).json({items: "new item"});
});

// // probably not needed
// router.put('/subscriptions/:id', function(req, res) {
//     // edit an item in a user's subscriptions
//     res.status(200).json({items: "updated"});
// });

router.delete('/users/:id/subscriptions/:id', function(req, res) {
    // delete an item in a user's subscriptions
    res.status(200).json({items: "deleted"});
});

module.exports = router;
