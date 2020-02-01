var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  
  
});

// This creates our model from the above schema, using mongoose's model method
//  this article is a Collection called "Books", defined by BookSchema
var Event = mongoose.model("Event", EventSchema);

module.exports = Event;