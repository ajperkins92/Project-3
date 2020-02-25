import React from "react";
import Nav from "../components/mainpage/nav"
import EventsHeader from "../components/ViewMyEventsPage/viewMyEventsHeader"
import OtherCards from "../components/mainpage/othercards"
import axios from "axios"
import "./myevents.css";

class MyEvents extends React.Component {

    state = {
        loggedIn: localStorage.getItem("loggedIn"),
        userID: localStorage.getItem("userID"),
        registeredEvents: [],
        organizedEvents: [],
        eventsYouMadeAndSignedUpFor: [],
        userimage: localStorage.getItem("userImage"),
    }

    componentDidMount() {
        this.getYourEvents(this.state.userID);
    }


    getYourEvents = (userID) => {
        axios.get(`/user/${userID}/myevents`)
            .then((response) => {
                let registeredEvents = [];
                let organizedEvents = [];
                let eventsYouMadeAndSignedUpFor = [];
                let arrayOfEvents = response.data[0].events;
                for (let i = 0; i < arrayOfEvents.length; i++) {
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

                this.calc(registeredEvents, 1);
                this.calc(organizedEvents, 2);
                this.calc(eventsYouMadeAndSignedUpFor, 3);

                this.setState(
                    {
                        registeredEvents: registeredEvents,
                        organizedEvents: organizedEvents,
                        eventsYouMadeAndSignedUpFor: eventsYouMadeAndSignedUpFor
                    }
                )
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    manageLogin = () => {
        if (this.state.loggedIn === "true") {
            localStorage.setItem("username", "");
            localStorage.setItem("loggedIn", "false");
            localStorage.setItem("userID", "");
            localStorage.setItem("userImage", "");
            this.setState({username: "", loggedIn: "false", userID: ""});
        }
    }

    calc = (array, iteration) => {
        let count = array.length;
        if (iteration === 1) {
            this.setState({ numcard1: count });
        } else if (iteration === 2) {
            this.setState({ numcard2: count });
        }
        else {
            this.setState({ numcard3: count });
        }
    }

    render() {
        return (
            <div className="eventcontainer">
                <Nav
                    loggedIn={this.state.loggedIn}
                    manageLogin={this.manageLogin}
                    href={this.state.href}>
                </Nav>
                                    <div className="eventmessage">
                                        <p className="myEventsText">Events you've signed up for:</p>
                                    </div>
                                    <div className="card_registered" >
                                        <div className="row">
                                            {this.state.registeredEvents.map((each) => (

                                                <OtherCards
                                                    image={each.image.url}
                                                    eventName={each.name}
                                                    eventID={each._id}
                                                    date={each.date}
                                                    description={each.description}>
                                                </OtherCards>
                                            ))}
                                        </div>
                                    </div>
                                    <div><hr /></div>
                                    <div className="eventmessage">
                                        <p className="myEventsText">Events you've organized:</p>
                                    </div>
                                    <div className="card_organized" >
                                        <div className="row">
                                            {this.state.organizedEvents.map((each) => (

                                                <OtherCards
                                                    image={each.image.url}
                                                    eventName={each.name}
                                                    eventID={each._id}
                                                    date={each.date}
                                                    description={each.description}>
                                                </OtherCards>
                                            ))}
                                        </div>
                                    </div>
                                    <div><hr /></div>
                                    <div className="eventmessage">
                                        <p className="myEventsText">Events you've organized and are attending:</p>
                                    </div>
                                    <div className="card_signedup" >
                                        <div className="row">
                                            {this.state.eventsYouMadeAndSignedUpFor.map((each) => (

                                                <OtherCards
                                                    image={each.image.url}
                                                    eventName={each.name}
                                                    eventID={each._id}
                                                    date={each.date}
                                                    description={each.description}>
                                                </OtherCards>
                                            ))}
                                        </div>
                                    </div>
                                </div>

        )
    }
}

export default MyEvents;
