const path = require("path");
const router = require("express").Router();
const db = require("../model/index");
const Moment = require("moment");
var nodemailer = require('nodemailer');

let emailer = (recipient, subject, message) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'volunteamsters@gmail.com',
            pass: ''
        }
    });

    var mailOptions = {
        from: 'volunteamsters@gmail.com',
        to: recipient,
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}



// home page route showing the last 5 events (as the last 5 events to be entered into the db)
router.get("/event", function (req, res) {
    db.Events.find({}).then((response) => {
        // response is an array, so I'm slicing off the last 5 items (slice takes a start and end, here' we are just finding the 
        // "start", which is to be the array length minus 5.  
        // and with the slice method, if there is no end given, it defaults "end" to be the end of the array")
        
        console.log(response);
        console.log("showing events");
        if (response.length > 5) {
            let lastFive = response.slice(Math.max(response.length - 5, 1));
            res.json(lastFive);
        }
        else {
            res.json(response);
        }
    });
})

// route for getting event information to display on event page
router.get("/event/:id", function (req, res) {
    let id = req.params.id
    db.Events.findById(id).then((response) => {
        let timeToEvent = Moment(`${response.date} ${response.time}`).fromNow();
        // the response should now have timeToEvent, which we can display as how long until this event
        res.json({fromDB: response, time: timeToEvent});
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
    // event organizer must be an mongodb id
    newEvent.organizer = req.body.organizer;
    newEvent.image = req.body.image;
    console.log(newEvent.organizer);

    // takes the organizer's username and finds its objectId 
    db.Users.findOne({ username: newEvent.organizer })
        .then(response => newEvent.organizerId = response._id)
        .then(response => {
            // creates the new event and pushes its id to the organizing user
            db.Events.create(newEvent)
            .then((dbEvent) => {
                console.log(dbEvent)
                console.log("Event created!");
                return db.Users.findByIdAndUpdate(
                    newEvent.organizer,
                    { $push: { events: dbEvent._id } },
                    { new: true }
                )
            })
            .then(response => res.json(response))
            .catch(err => res.status(422).json(err))
        })
        .catch(err => console.log(err))

});

// updating an existing event
router.put("/event/:id", function (req, res) {
    let id = req.params.id;
    // we assume that all the fields can be updated EXCEPT organizer, so we need the req.body to contain all of those fields.
    // We should prepopulate the fields with the information already relevant to the event, so that if a field is not updated,
    // it stays as the old value
    db.Events.findByIdAndUpdate(id,
        {
            $set: {
                name: req.body.name,
                address: req.body.address,
                date: req.body.date,
                time: req.body.time,
                description: req.body.description,
                image: req.body.image
                // NOT ALLOWING ORGANIZER TO BE CHANGED
            }
        }
    ).then((response) => {
        res.json(response);
        db.Events.findById(id).select("attendees")
            .then((response) => {
                console.log("this should show all attendees")
                console.log(response);
                // expect an array, this should contain an array with user's ID.  THEN NEED ANOTHER QUERY TO FIND EMAIL
                // then initiate for loop on all registered attendees based on response.length

                // when ready to use, input is an array of emails, need to push the emails from these, so do a query
                // on every attendee's email via their userID, once got email, push that to an array
                // then do array operations to give the emailer the string it needs, with CSV for emails
                // ** 2/3/2020 NEED TO TEST THAT emailsList.toString is a valid input ,but honestly it should be

                let emailBot = (input) => {

                    let emailList = [];
                    for (i = 0; i < input.length; i++) {
                        db.Users.findById(input.attendees[i]).select("email").then((response) => {
                            emailList.push(response);
                        })
                    }
                    emailer(emailList.toString, "Test!",
                        `Your event has been changed!  Here are the details \n
                            `, () => {
                    });
                }
                emailBot(response);
                // emailer("volunteamsters@gmail.com", "Test!",
                //     `Your event has been changed!  Here are the details \n
                // Your event's attendees are now ${response}`, () => {
                // });
            })

    }).catch(err => res.status(422).json(err));
});

// deleting an existing event
router.delete("/event/:id", function (req, res) {
    let id = req.params.id;
    // ** NEED TO SEND USERID FOR THIS ROUTE
    // User ID needs to be supplied from client side
    db.Events.findByIdAndDelete(id)
        .then(response => {
            db.Users.findByIdAndUpdate(req.body.userID,
                { $pullAll: { events: [id] } })
                .then(response => {
                    res.json(`${id} has been deleted`)
                })
        })
        .catch(err => res.status(422).json(err));
})


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


module.exports = router