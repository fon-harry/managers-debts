const express = require("express");
const router = express.Router();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const knex = require("knex")(configuration);

const fs = require("fs");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.redirect("/manager");
});

router.post("/", async function(req, res, next) {
  const data = req.body;
  try {
    await knex("contracts").del();
    await knex("clients").del();
    await knex("managers").del();
    await Promise.all(
      data.managersDebts.map(({ id: id_8, name, clients }) => {
        return knex("managers")
          .insert({ id_8, name })
          .then(manager_id => {
            return Promise.all(
              clients.map(({ id: id_8, name, contracts }) => {
                return knex("clients")
                  .insert({ manager_id, id_8, name })
                  .then(client_id => {
                    const contractsArray = [];
                    contracts.forEach(({ id: id_8, name, debt }) => {
                      contractsArray.push({
                        client_id,
                        id_8,
                        name,
                        debt
                      });
                    });
                    return knex("contracts").insert(contractsArray);
                  });
              })
            );
          });
      })
    );

    res.send("JSON file has been saved to database.");
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
