const express = require('express');
const router = express.Router();

const managersData = require('../data/data.json');

/* GET managers listing. */
router.get('/', function(req, res, next) {
    res.json(managersData);
});

router.get('/:managerName', function(req, res, next) {
    const managerName = req.params.managerName;
    res.send(managersData.find(item => item['name'] === managerName));
});


module.exports = router;