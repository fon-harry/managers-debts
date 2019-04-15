const express = require('express');
const router = express.Router();

const managersData = require('../data/data.json');


router.get('/', function(req, res, next) {
	const managerId = req.query.managerId;

	if (!managerId) res.redirect(`/managers?managerId=${managersData[0]['id']}`);

	const managersList = managersData.map(({id, name}) => ({id, name, link: `/managers?managerId=${id}`}))
	const managerData = managersData.find(({id}) => id === managerId);

	// res.send({managersList, managerData});
	res.render('manager', {managersList, managerData});
});

// router.get('/:managerName', function(req, res, next) {
// 	const managerName = req.params.managerName;
// 	managerData = managersData.find(item => item['name'] === managerName);

// 	const managersList = [];
// 	managersData.forEach(({id, name}) => {
// 		managersList.push({id, name, link: `/managers/${name}`})
// 	});

// 	managerData['managersList'] = managersList;

// 	res.render('manager', managerData);
// });


module.exports = router;