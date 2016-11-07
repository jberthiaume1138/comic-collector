var express = require('express');
var router = express.Router();

var items = require('../controllers/items');

router.get('/series/:id', items.seriesIssues);

router.get('/search/:query', items.searchMarvel);

router.get('/users', items.usersList);      //admin only    //tested
router.post('/users', items.usersCreate);   //admin only

router.get('/users/:userid', items.usersReadOne);   //tested
router.put('/users/:userid', items.usersUpdateOne);
router.delete('/users/:userid', items.usersDeleteOne);

router.get('/users/:userid/subscriptions', items.subscriptionsList);    //tested
router.post('/users/:userid/subscriptions', items.subscriptionsCreate);
router.get('/users/:userid/subscriptions/:subscriptionid', items.subscriptionsReadOne);     //tested
router.put('/users/:userid/subscriptions/:subscriptionid', items.subscriptionsUpdateOne);
router.delete('/users/:userid/subscriptions/:subscriptionid', items.subscriptionsDeleteOne);

module.exports = router;
