var express = require('express');
var router = express.Router();

var items = require('../controllers/items');

router.get('/series/:id', items.seriesIssues);

router.get('/search/:query', items.searchMarvel);

router.get('/users', items.usersList);      //admin only    //tested
router.post('/users', items.usersCreate);   //admin only

router.get('/users/:id', items.usersReadOne);   //tested
router.put('/users/:id', items.usersUpdateOne);
router.delete('/users/:id', items.usersDeleteOne);

router.get('/users/:id/subscriptions', items.subscriptionsList);    //tested
router.post('/users/:id/subscriptions', items.subscriptionsCreate);
router.get('/users/:id/subscriptions/:subscriptionid', items.subscriptionsReadOne);
router.put('/users/:id/subscriptions/:subscriptionid', items.subscriptionsUpdateOne);
router.delete('/users/:id/subscriptions/:subscriptionid', items.subscriptionsDeleteOne);

module.exports = router;
