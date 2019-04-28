const express = require("express");
const router = express.Router();

const managersData = require("../data/data.json").managersDebts;

router.get("/", function(req, res, next) {
  const managerId = req.query.id;

  if (!managerId) res.redirect(`/manager?id=${managersData[0]["id"]}`);

  const managersList = managersData.map(({ id, name }) => ({
    id,
    name,
    link: `/manager?id=${id}`
  }));
  const managerData = managersData.find(({ id }) => id === managerId);

  console.log(managerData);

  res.render("manager", { managersList, managerData });
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
