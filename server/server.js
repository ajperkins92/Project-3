const mongoose = require("mongoose");
const express = require("express");
const app = express();
const routes = require("./routes");
const session = require("express-session");
const passport = require("./passport");
const MongoStore = require('connect-mongo')(session)
const morgan = require("morgan");
const PORT = process.env.PORT || 3001;

// Connect to the Mongo DB

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/volunteam";
mongoose.connect(MONGODB_URI);


// Define middleware here
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// We need to use sessions to keep track of our user's login status
app.use(
  session({
    secret: "keyboard cat",
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false
  }));

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);




// Start the server
app.listen(PORT, function () {
  console.log(`🌎  ==> Server now listening on PORT ${PORT}!`);

});