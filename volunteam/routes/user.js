const path = require("path");
const router = require("express").Router();
const db = require("../model");

// gets all users
router.get("/user", function (req, res) {
    db.Users.find({}).then((response) => {
        res.json(response);
    });
});

// creates a new user
router.post("/user", function (req, res) {
    console.log("api POST request received");
    let newUser = {};

    newUser.username = req.body.username;
    newUser.firstname = req.body.firstname;
    newUser.lastname = req.body.lastname;
    newUser.password = req.body.password;
    newUser.email = req.body.email;
    newUser.image = req.body.image;

    db.Users.create(newUser)
        .then((response) => {
            console.log("test");
            console.log(response);
            res.json(response);
        })
        .catch(err => res.status(422).json(err));
});

// gets a specific user by id
router.get("/user/:id", (req, res) => {
    db.Users.find({ _id: req.params.id })
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.json(err)
        })
});


module.exports = router


