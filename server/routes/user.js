const router = require("express").Router();
const db = require("../model");
const passport = require("../passport");

// get route for all users
router.get("/user", function (req, res) {
    db.Users.find({})
        .then((response) => res.json(response))
});

// post route to create a new user
router.post("/user", function (req, res) {
    console.log("api POST request received");
    let newUser = {};

    newUser.username = req.body.username;
    newUser.firstname = req.body.firstname;
    newUser.lastname = req.body.lastname;
    newUser.password = req.body.password;
    newUser.email = req.body.email;
    newUser.image = req.body.image;


    db.Users.findOne({ username: newUser.username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${newUser.username}`
            });
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${req.body.username}`
            });
        }
        else {
            db.Users.findOne({ email: newUser.email }, (err, user) => {
                if (err) {
                    console.log('User.js post error: ', err)
                } else if (user) {
                    res.json({
                        error: `Sorry, already a user with the email: ${newUser.email}`
                    })
                } else {
                    db.Users.create(newUser)
                        .then((response) => res.json(response))
                        .catch(err => res.status(422).json(err));
                }
            });
        }
    });
});

// get route for a specific user by id
router.get("/user/:id", (req, res) => {
    console.log(`this is req.params.id ${req.params.id}`)
    db.Users.find({ _id: req.params.id })
        .then(user => res.json(user))
        .catch(err => res.json(err))
});

// put route to update user information
router.put("/user/:id", (req, res) => {
    db.Users.findByIdAndUpdate(req.params.id,
        {
            // users not allowed to change their username
            // so update all fields except username
            $set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                image: req.body.image
            }
        })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.json(err))
});

// get route to get all events a user is attending or organizing
router.get("/user/:id/myevents", (req, res) => {
    db.Users.find({ _id: req.params.id })
        .populate("events")
        .then(user => res.json(user))
        .catch(err => res.json(err))
});

// post route to create a new login session
router.post(
    '/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            id: req.user._id,
            username: req.user.username
        };
        res.send(userInfo);
    }
)


module.exports = router


