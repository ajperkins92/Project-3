var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var UserSchema = new Schema({

    username: {
        type: String,
        required: true
    },

    firstname: {
        type: String,
        required: true,
    },

    lastname: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: false,
        default: "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
    }

});

// This creates our model from the above schema, using mongoose's model method
//  this article is a Collection called "Books", defined by BookSchema
var User = mongoose.model("User", UserSchema);

module.exports = User;