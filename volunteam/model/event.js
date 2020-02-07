var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;


var EventSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true,
    },

    date: {
        type: String,
        required: true,
    },

    time: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: false,
        default: "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
    },

    organizer: {
        type: String,
        required: true,
    },

    attendees: [{
        type: Schema.Types.ObjectId,
        ref: "Users",
    }]

});

// This creates our model from the above schema, using mongoose's model method
//  this article is a Collection called "Books", defined by BookSchema
var Events = mongoose.model("Events", EventSchema);

module.exports = Events;