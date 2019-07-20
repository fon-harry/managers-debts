const express = require("express");
const router = express.Router();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const knex = require("knex")(configuration);

/* GET home page. */
router.get("/", function(req, res, next) {
  res.redirect("/manager");
});

router.post("/", async function(req, res, next) {
  const data = req.body;
  try {
    // removing data
    await knex("userManagers").del();

    await knex("contracts").del();
    await knex("clients").del();
    await knex("managers").del();

    await knex("users").del();

    // inserting managers debts data
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

    // inserting data about users

    await Promise.all(
      data.users.map(
        ({
          username,
          password,
          isAdmin = false,
          isSupervisor = false,
          managers = []
        }) => {
          return knex("users")
            .insert({ username, password, isAdmin, isSupervisor })
            .then(user_id => {
              return Promise.all(
                managers.map(({ id: manager_id }) => {
                  return knex("managers")
                    .select("id")
                    .first()
                    .where("id_8", manager_id)
                    .then(manager => manager.id)
                    .then(manager_id =>
                      knex("userManagers").insert({
                        user_id,
                        manager_id
                      })
                    );
                })
              );
            });
        }
      )
    );

    res.send("JSON file has been saved to database.");
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
