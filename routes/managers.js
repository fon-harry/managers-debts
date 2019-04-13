const express = require('express');
const router = express.Router();

const managersData = require('../data/data.json');


router.get('/', function(req, res, next) {
    res.redirect(`/managers/${managersData[0].name}`);
});

router.get('/:managerName', function(req, res, next) {
    const managerName = req.params.managerName;
    managerData = managersData.find(item => item['name'] === managerName);

    const managersList = [];
    managersData.forEach(({id, name}) => {
        managersList.push({id, name, link: `/managers/${name}`})
    });

    managerData['managersList'] = managersList;

    res.render('manager', managerData);
});


module.exports = router;