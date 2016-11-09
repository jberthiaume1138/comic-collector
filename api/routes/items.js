var express = require('express');
var router = express.Router();

var items = require('../controllers/items');

router.get('/series/:id', items.seriesIssues);

router.get('/search/:query', items.searchMarvel);

router.get('/users', items.usersList);     //x  //admin only    //tested
router.post('/users', items.usersCreate);  //x  //admin only

router.get('/users/:userid', items.usersReadOne);       //x //tested
router.put('/users/:userid', items.usersUpdateOne);     //x
router.delete('/users/:userid', items.usersDeleteOne);  //x

router.get('/users/:userid/subscriptions', items.subscriptionsList);    //x //tested
router.post('/users/:userid/subscriptions', items.subscriptionsCreate); //x
router.get('/users/:userid/subscriptions/:subscriptionid', items.subscriptionsReadOne);     //tested
router.put('/users/:userid/subscriptions/:subscriptionid', items.subscriptionsUpdateOne);
router.delete('/users/:userid/subscriptions/:subscriptionid', items.subscriptionsDeleteOne);

module.exports = router;
