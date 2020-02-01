const path = require("path");
const router = require("express").Router();
const db = require("../model/index");
const userRoutes = require("./user")

// router.use("/user", require("./user"));

router.use(userRoutes);

// If no API routes are hit, send the React app

router.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

module.exports = router;
