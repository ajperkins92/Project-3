import React from 'react';
import Nav from "../components/mainpage/nav"
import CreateEventForm from "../components/CreateEventPage/createeventform"
import axios from "axios";

class CreateEvent extends React.Component {

    state = {
        loggedIn: localStorage.getItem('loggedIn'),
        userID: localStorage.getItem('userID'),
        username: localStorage.getItem('username'),
        userimage: localStorage.getItem('userImage'),
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
                window.location.replace("/");
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

        eventDetails.organizer = this.state.username;

        this.createEvent(eventDetails);
    };

    manageLogin = () => {
        if (this.state.loggedIn === "true") {
            // if you're logged in, log out in localstorage, as well as this page's state
            
            
            localStorage.setItem('username', "");
            localStorage.setItem('loggedIn', "false");
            localStorage.setItem('userID', "");
            localStorage.setItem('userImage', "");
            this.setState({username: "", loggedIn: "false", userID: ""});
            
        }
        else {
            // Do nothing:  The reason is:
            // If you're not logged in, let the anchor href take you to the login page, but don't manage any state with the current page
        }
    }

    render() {
        return (
            <div>
                <Nav
                    loggedIn={this.state.loggedIn}
                    manageLogin={this.manageLogin}
                    href={this.state.href}>
                </Nav>
                <CreateEventForm
                    handleInputChange={this.handleInputChange}
                    
                    handleFormSubmit={this.handleFormSubmit}>
                </CreateEventForm>
            </div>
        )
    }
}

export default CreateEvent;
