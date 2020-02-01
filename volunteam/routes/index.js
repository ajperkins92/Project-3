const path = require("path");
const router = require("express").Router();
const db = require("../models/index");

//

//

// If no API routes are hit, send the React app

router.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/public/index.html"));
  });

module.exports = router;
