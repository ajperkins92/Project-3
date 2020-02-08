const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../model");

// Telling passport we want to use a Local Strategy. In other words,
//we want login with a username and password
passport.use(new LocalStrategy(
    function (username, password, done) {
        // When a user tries to sign in this code runs
        db.Users.findOne({ username: username }), function (err, user) {
            if (err) { return done(err) }
            // If there's no user with the given username
            if (!user) {
                return done(null, false, {
                    message: "Incorrect username."
                });
            }
            // If there is a user with the given username, but the password the user gives us is incorrect
            else if (!user.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
            // If none of the above, return the user
            return done(null, user);
        };
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findOne({
        _id: id
    }, '-password -salt', function (err, user) {
        done(err, user);
    });
});

// Exporting our configured passport
module.exports = passport;