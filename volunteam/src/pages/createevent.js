import React from 'react';
import Nav from "../components/mainpage/nav"
import CreateEventForm from "../components/CreateEventPage/createeventform"
import axios from "axios";


class CreateEvent extends React.Component {

    state = {
        loggedIn: true,
        eventName: "",
        address: "",
        date: "",
        time: "",
        description: "",
    }

    createEvent = (newEvent) => {
        console.log(JSON.stringify(newEvent));
        axios.post("/event", newEvent)
            .then((response) => {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleInputChange = event => {

        const name = event.target.name;

        // for multiple fields, value will be the field you want, because it's using target 
        let value = event.target.value;

        console.log(`thing being changed is ${name}`)
        console.log(`and it's being changed to ${value}`)
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        let eventDetails = {}
        eventDetails.name = this.state.eventName;
        eventDetails.address = this.state.address;
        eventDetails.date = this.state.date;
        eventDetails.time = this.state.time;
        eventDetails.description = this.state.description;
        // FOR TESTING ONLY
        eventDetails.organizer = "kensen";
        // FOR TESTING ONLY

        this.createEvent(eventDetails);
    };

    render() {
        return (
            <div>
                <Nav
                    loggedIn={this.state.loggedIn}
                    manageLogin={this.manageLogin}>
                </Nav>
                <CreateEventForm
                    handleInputChange={this.handleInputChange}
                    value={this.state.value}
                    handleFormSubmit={this.handleFormSubmit}>
                </CreateEventForm>
            </div>
        )
    }
}

export default CreateEvent;
