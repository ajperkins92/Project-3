var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var UsersSchema = new Schema({

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
    },

    events: {
        type: Schema.Types.ObjectId,
        ref: "Events"
    }

});

// This creates our model from the above schema, using mongoose's model method
//  this article is a Collection called "Books", defined by BookSchema
var Users = mongoose.model("Users", UsersSchema);

module.exports = Users;