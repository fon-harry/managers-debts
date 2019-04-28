var express = require("express");
var router = express.Router();

const fs = require("fs");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.redirect("/manager");
});

router.post("/", function(req, res, next) {
  const data = req.body;

  fs.writeFile(
    "data/data.json",
    JSON.stringify(data, null, 4),
    "utf8",
    function(err) {
      if (err) {
        res.send("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
      res.send("JSON file has been saved.");
    }
  );
});

module.exports = router;
