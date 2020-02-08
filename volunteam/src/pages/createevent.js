import React from 'react';
import Nav from "../components/mainpage/nav"
import CreateEventForm from "../components/CreateEventPage/createeventform"


class CreateEvent extends React.Component {

    state = {
        loggedIn: true,
        eventName: "",
        address: "",
        date: "",
        time: "",
        description: "",
    }

    createEvent = () => {

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
        console.log(`here's the event you're creating ${eventDetails}`)
        // this.createEvent(eventDetails);
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
                valueName={this.state.eventName}
                valueAddress={this.state.address}
                valueDate={this.state.date}
                valueTime={this.state.time}
                valueDescription={this.state.description}
                handleFormSubmit={this.handleFormSubmit}>
                </CreateEventForm>
            </div>
        )
    }
}

export default CreateEvent;
