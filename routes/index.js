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

router.get("/del", async function(req, res, next) {
  try {
    await knex("contracts").del();
    await knex("clients").del();
    await knex("managers").del();

    res.send("deleted");
  } catch (error) {
    return error;
  }
});

router.post("/", function(req, res, next) {
  const data = req.body;

  console.log(data);

  Promise.all(
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
  )
    .catch(err => {
      res.send("An error occured while writing JSON Object to database.", err);
      throw err;
    })
    .finally(() => {
      res.send("JSON file has been saved to database.");
    });
});

module.exports = router;
