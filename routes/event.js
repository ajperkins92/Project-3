const router = require("express").Router();
const db = require("../model/index");
const Moment = require("moment");
var nodemailer = require('nodemailer');
const parser = require("../cloudinary/cloudinary");
const cloudinary = require("cloudinary");

// home page route showing the last 5 events (as the last 5 events to be entered into the db)
router.get("/event", function (req, res) {
    db.Events.find({}).then((response) => {
        // response is an array, so I'm slicing off the last 5 items (slice takes a start and end, here' we are just finding the 
        // "start", which is to be the array length minus 5.  
        // and with the slice method, if there is no end given, it defaults "end" to be the end of the array")

        console.log(response);
        console.log("showing events");
        if (response.length > 5) {
            let lastFive = response.slice(Math.max(response.length - 7, 1));
            res.json(lastFive);
        }
        else {
            res.json(response);
        }
    });
});

// route for getting event information to display on event page
router.get("/event/:id", function (req, res) {
    let id = req.params.id
    db.Events.findById(id)
        .populate("attendees")
        .then((response) => {
            let timeToEvent = Moment(`${response.date} ${response.time}`).fromNow();
            // the response should now have timeToEvent, which we can display as how long until this event
            res.json({ fromDB: response, time: timeToEvent });
        });
});


// creating a new event
router.post("/event", parser.single("image"), function (req, res) {
    console.log("event POST request received");
    let newEvent = {};
    let image = {};

    if (req.file) {
        image.url = req.file.url;
        image.id = req.file.public_id;
    } else {
        image = req.body.image;
    }

    newEvent.name = req.body.name;
    newEvent.address = req.body.address;
    // ** NEED TO MAKE SURE DATE is ENTERED AS "2020-02-04"
    newEvent.date = req.body.date;
    // ** NEED TO MAKE SURE TIME IS ENTERED AS "14:00"
    newEvent.time = req.body.time;
    newEvent.description = req.body.description
    newEvent.organizer = req.body.organizer;
    newEvent.image = image;

    // takes the organizer's username and finds its objectId 
    db.Users.findOne({ username: newEvent.organizer })
        .then(response => newEvent.organizerId = response._id)
        .then(response => {
            // creates the new event and pushes its id to the organizing user
            db.Events.create(newEvent)
                .then((dbEvent) => {
                    res.json(dbEvent);
                    return db.Users.findByIdAndUpdate(
                        newEvent.organizerId,
                        { $push: { events: dbEvent._id } },
                        { new: true }
                    )
                })
                .catch(err => res.status(422).json(err))
        })
        .catch(err => console.log(err))

});

// updating an existing event
router.put("/event/:id", parser.single("image"), function (req, res) {
    db.Events.findById(req.params.id)
        .then(event => {
            // stores current event image id to use for deletion
            const id = event.image.id;
            let image = {};

            // if a new image is being uploaded to an event, set the image object properties to the new image
            if (req.file) {
                console.log(req.file);
                image.url = req.file.url;
                image.id = req.file.public_id;
                // takes the old stored image id and deletes it from cloudinary storage
                if (id) {
                    cloudinary.v2.uploader.destroy(id, (err, res) => {
                        if (err) console.log(err);
                        console.log("This is the response:" + res)
                    });
                }
                // if a new image is not being uploaded then set new image object to the current image object
            } else {
                image = event.image;
                console.log(image);
            }
            db.Events.findByIdAndUpdate(event._id,
                {
                    // we assume that all the fields can be updated EXCEPT organizer, so we need the req.body to contain all of those fields.
                    // We should prepopulate the fields with the information already relevant to the event, so that if a field is not updated,
                    // it stays as the old value
                    $set: {
                        name: req.body.name,
                        address: req.body.address,
                        date: req.body.date,
                        time: req.body.time,
                        description: req.body.description,
                        image: image
                    }
                }, { new: true })
                .then(updatedEvent => {
                    res.json(updatedEvent)
                })
        })
        .catch(err => res.json(err));
});

// deleting an existing event
router.delete("/event/:id", parser.single("image"), function (req, res) {
    let id = req.params.id;
    // ** NEED TO SEND USERID FOR THIS ROUTE
    // User ID needs to be supplied from client side
    db.Events.findByIdAndDelete(id)
        .then(event => {
            cloudinary.v2.uploader.destroy(event.image.id, (err, res) => {
                if (err) console.log(err);
                console.log("This is the response:" + res);
            });
            db.Users.findByIdAndUpdate(req.body.userID,
                { $pullAll: { events: [id] } })
                .then(response => {
                    res.json(`${id} has been deleted`);
                })
        })
        .catch(err => res.status(422).json(err));
});


// adding a user to an existing event via Attendees array field in Mongodb
router.put("/signup/:id", function (req, res) {
    let id = req.params.id;
    // ** NEED TO SEND USERID FOR THIS ROUTE
    // User ID needs to be supplied from client side
    console.log(`id for event is ${id}, userID is ${req.body.userID}`)
    db.Events.findByIdAndUpdate(id,
        {
            $addToSet: { attendees: req.body.userID }
        }).then(dbEvent => {
            return db.Users.findByIdAndUpdate(req.body.userID,
                { $addToSet: { events: id } },
                { new: true })
        })
        .then((response) => {
            res.json(response);
        }).catch(err => res.status(422).json(err));
});


router.get("/search", (req, res) => {
    const query = req.query.q;
    console.log("Query is " + query);
    db.Events.find({ $text: { $search: query } })
        .then(events => {
            if (events.length > 0) {
                if (events.length > 5) {
                    let lastFive = events.slice(Math.max(events.length - 7, 1));
                    res.json(lastFive);
                }
                else {
                    res.json(events);
                }
            } else {
                res.json("No events were found. Try another search.");
            }

        })
        .catch(err => res.status(422).json(err));
});

module.exports = router