const express = require('express');
const router = express.Router();

const managersData = require('../data/data.json');

/* GET managers listing. */
router.get('/', function(req, res, next) {
    const managersList = [];
    managersData.forEach(({id, name}) => {
        managersList.push({id, name, link: `managers/${name}`})
    });
    res.json(managersList);
});

router.get('/:managerName', function(req, res, next) {
    const managerName = req.params.managerName;
    managerData = managersData.find(item => item['name'] === managerName);
    res.render('manager', managerData);
});


module.exports = router;