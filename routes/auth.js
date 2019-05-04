const express = require("express");
const router = express.Router();

router.get("/signin", function(req, res, next) {
  res.render("signin");
});

router.post("/signin", function(req, res, next) {
  let login = req.body.login;
  let password = req.body.password;

  res.send({ login, password });
});

module.exports = router;
