var mongoose = require("mongoose");
const crypto = require('crypto');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var UsersSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
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
        required: true,
        unique: true,
    },

    image: {
        type: String,
        required: false,
        default: "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
    },

    events: [{
        type: Schema.Types.ObjectId,
        ref: "Events"
    }]


});

UsersSchema.pre('save', function (next) {
    if (this.password) {
        this.salt = new Buffer(
            crypto.randomBytes(16).toString('base64'),
            'base64'
        );
        this.password = crypto.pbkdf2Sync(
            password, this.salt, 10000, 64).toString('base64');
    };
    next();
});



// This creates our model from the above schema, using mongoose's model method
//  this article is a Collection called "Users", defined by UsersSchema
var Users = mongoose.model("Users", UsersSchema);

module.exports = Users;