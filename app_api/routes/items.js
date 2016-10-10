var express = require('express');
var router = express.Router();

var items = require('../controllers/items');

router.get('/series/:id', items.seriesIssues);

module.exports = router;
