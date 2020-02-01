const path = require("path");
const router = require("express").Router();
const db = require("../model");


    router.get("/user", function (req, res) {
        db.Users.find({}).then( (response) => {
            res.json(response);
        });
    })
    
    router.post("/user", function (req, res) {
        console.log("api POST request received");
        let newUser = {};
    
        newUser.username = req.body.username;
        newUser.firstname = req.body.firstname;
        newUser.lastname = req.body.lastname;
        newUser.password = req.body.password;
        newUser.email = req.body.email;
        newUser.image = req.body.image;

        // console.log(newUser);

        db.Users.create(newUser)
        .then( (response) => {
            console.log("test");
            console.log(response);
            res.json(response);
        })
        .catch(err => res.status(422).json(err));
    })

    module.exports = router


