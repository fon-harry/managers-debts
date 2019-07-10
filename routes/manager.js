const express = require("express");
const router = express.Router();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const knex = require("knex")(configuration);

router.get("/", async function(req, res, next) {
  let managerId = req.query.id;

  if (!managerId) {
    const firstManagerId = await knex
      .select("id")
      .from("managers")
      .orderBy("name")
      .limit(1);
    managerId = firstManagerId[0].id;
    res.redirect(`/manager?id=${managerId}`);
  }

  managerId = Number(managerId);

  const getManagerName = async () => {
    const tmp = await knex
      .select("name")
      .from("managers")
      .where("id", managerId);

    return tmp[0].name;
  };

  const managerName = await getManagerName();

  const managersList = await knex
    .select("id", "name")
    .from("managers")
    .orderBy("name")
    .map(({ id, name }) => ({ id, name, link: `/manager?id=${id}` }));

  let managerData = await knex
    .select({
      clientId: "clients.id",
      client: "clients.name",
      contractId: "contracts.id",
      contract: "contracts.name",
      debt: "contracts.debt"
    })
    .from("clients")
    .orderBy("client", "clientId", "contract")
    .where("manager_id", managerId)
    .rightJoin("contracts", "clients.id", "contracts.client_id")
    .reduce((accum, element) => {
      const findedClient = accum.find(
        item => item.clientId === element.clientId
      );

      if (findedClient !== undefined) {
        findedClient.contracts.push({
          contractId: element.contractId,
          contractName: element.contract,
          debt: element.debt
        });
        return accum;
      }

      return [
        ...accum,
        {
          clientId: element.clientId,
          clientName: element.client,
          contracts: [
            {
              contractId: element.contractId,
              contractName: element.contract,
              debt: element.debt
            }
          ]
        }
      ];
    }, []);

  managerData = {
    managerId,
    managerName,
    clients: managerData
  };

  res.render("manager", { managersList, managerData });
});

module.exports = router;
