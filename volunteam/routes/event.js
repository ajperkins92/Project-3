const path = require("path");
const router = require("express").Router();
const db = require("../model/index");
const Moment = require("moment");

// home page route showing the last 5 events (as the last 5 events to be entered into the db)
router.get("/event", function (req, res) {
    db.Events.find({}).then((response) => {
        // response is an array, so I'm slicing off the last 5 items (slice takes a start and end, here' we are just finding the 
        // "start", which is to be the array length minus 5.  
        // and with the slice method, if there is no end given, it defaults "end" to be the end of the array")
        let lastFive = response.slice(Math.max(response.length - 5, 1))
        res.json(lastFive);
    });
})

// route for getting event information to display on event page
router.get("/event/:id", function (req, res) {
    let id = req.params.id
    db.Events.findById(id).then((response) => {
        response.timeToEvent = Moment(`${response.date} ${response.time}`).fromNow();
        console.log(response.timeToEvent)
        // the response should now have timeToEvent, which we can display as how long until this event
        res.json(response);
    });
})

// creating a new event
router.post("/event", function (req, res) {
    console.log("event POST request received");
    let newEvent = {};

    newEvent.name = req.body.name;
    newEvent.address = req.body.address;
    // ** NEED TO MAKE SURE DATE is ENTERED AS "2020-02-04"
    newEvent.date = req.body.date;
    // ** NEED TO MAKE SURE TIME IS ENTERED AS "14:00"
    newEvent.time = req.body.time;
    newEvent.description = req.body.description
    newEvent.organizer = req.body.organizer;
    newEvent.image = req.body.image;

    db.Events.create(newEvent)
        .then((response) => {
            res.json(response);
        })
        .catch(err => res.status(422).json(err));
})

// updating an existing event
router.put("/event/:id", function (req, res) {
    let id = req.params.id;
    // we assume that all the fields can be updated EXCEPT organizer, so we need the req.body to contain all of those fields.
    // We should prepopulate the fields with the information already relevant to the event, so that if a field is not updated,
    // it stays as the old value
    db.Events.findByIdAndUpdate(id,
        {$set: {
            name: req.body.name,
            address: req.body.address,
            date: req.body.date,
            time: req.body.time,
            description: req.body.description,
            image: req.body.image
            // NOT ALLOWING ORGANIZER TO BE CHANGED
        }}
        ).then((response) => {
            res.json(response);
        }).catch(err => res.status(422).json(err));
});

// deleting an existing event
router.delete("/event/:id", function (req, res) {
    let id = req.params.id;
    db.Events.findByIdAndDelete(id)
    .then(res.json(`${id} has been deleted`))
    .catch(err => res.status(422).json(err));
})

// adding a user to an existing event via Attendees array field in Mongodb
router.put("/signup/:id", function (req, res) {
    let id = req.params.id;
    // ** NEED TO SEND USERID FOR THIS ROUTE
    db.Events.findByIdAndUpdate(id, 
        { 
            $push : {attendees: req.body.userID}
        }).then( (response) => {
        res.json(response);
    }).catch(err => res.status(422).json(err));
});

module.exports = router