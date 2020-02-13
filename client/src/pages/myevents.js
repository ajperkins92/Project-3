import React from 'react';
import Nav from "../components/mainpage/nav"
import EventsHeader from "../components/ViewMyEventsPage/viewMyEventsHeader"
import OtherCards from "../components/mainpage/othercards"
import axios from "axios"

class MyEvents extends React.Component {

    state = {
        loggedIn: localStorage.getItem('loggedIn'),
        userID: localStorage.getItem('userID'),
        registeredEvents: [],
        organizedEvents: [],
        eventsYouMadeAndSignedUpFor: []
    }

    componentDidMount() {
        this.getYourEvents(this.state.userID)
    }

    getYourEvents = (userID) => {
        axios.get(`/user/${userID}/myevents`)
        .then((response) => {
            console.log(response.data[0].events)
            let registeredEvents = [];
            let organizedEvents = [];
            let eventsYouMadeAndSignedUpFor= [];
            let arrayOfEvents = response.data[0].events;
            for (let i = 0; i < arrayOfEvents.length; i++) {

                console.log(`Event ${i}`)
                console.log(`This event's organizer is ${arrayOfEvents[i].organizerId}`);
                console.log(`Your userID is ${userID}`)
                console.log(`The attendees are ${arrayOfEvents[i].attendees}`)
                
                // if you are signed up for the event, and are also the organizer:
                if (arrayOfEvents[i].organizerId === userID && arrayOfEvents[i].attendees.includes(userID)) {
                    eventsYouMadeAndSignedUpFor.push(arrayOfEvents[i]);
                }

                // if you are NOT signed up for the event, but you are the organizer:
                else if (arrayOfEvents[i].organizerId === userID && !arrayOfEvents[i].attendees.includes(userID)) {
                    organizedEvents.push(arrayOfEvents[i]);
                }
                
                // if you are registered for the event but are NOT the organizer:
                else {
                    registeredEvents.push(arrayOfEvents[i]);
                }
                
            }
            
            console.log(eventsYouMadeAndSignedUpFor);
                console.log(organizedEvents);
                console.log(registeredEvents);
            // if organizer ID matches your ID, push it to organizedEvents, else push it to registeredEvents

            this.setState(
                {registeredEvents: registeredEvents,
                organizedEvents: organizedEvents,
                eventsYouMadeAndSignedUpFor: eventsYouMadeAndSignedUpFor}
            )
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <Nav
                    loggedIn={this.state.loggedIn}
                    manageLogin={this.manageLogin}>
                </Nav>
                <p>Events you are signed up for:</p>
                <div className="row">
                {this.state.registeredEvents.map( (each) => (
                        
                        <OtherCards
                        image={each.image}
                        eventName={each.name}
                        eventID={each._id}
                        date={each.date}
                        description={each.description}>
                            
                        </OtherCards>
                    ))}
                </div>
                <hr></hr>
                <p>Events you've organized:</p>
                <div className="row">
                {this.state.organizedEvents.map( (each) => (
                        
                        <OtherCards
                        image={each.image}
                        eventName={each.name}
                        eventID={each._id}
                        date={each.date}
                        description={each.description}>
                        </OtherCards>
                    ))}
                </div>
                <hr></hr>
                <p>Events you've organized AND are attending:</p>
                <div className="row">
                {this.state.eventsYouMadeAndSignedUpFor.map( (each) => (
                        
                        <OtherCards
                        image={each.image}
                        eventName={each.name}
                        eventID={each._id}
                        date={each.date}
                        description={each.description}>
                        </OtherCards>
                    ))}
                </div>
            </div>
        )
    }
}

export default MyEvents;
