const express = require('express');
const router = express.Router();

const managersData = require('../data/data.json');

/* GET managers listing. */
router.get('/', function(req, res, next) {
    res.json(managersData);
});
  
module.exports = router;
  