import React from 'react';
import Nav from "../components/mainpage/nav"
import CreateEventForm from "../components/CreateEventPage/createeventform"


class CreateEvent extends React.Component {

    state = {
        loggedIn: true,
    }

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(`thing being changed is ${name}`)
        console.log(`and it's being changed to ${value}`)
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        this.searchEventsByZIP(this.state.searchZIP);
    };

    render() {
        return (
            <div>
                <Nav
                    loggedIn={this.state.loggedIn}
                    manageLogin={this.manageLogin}>
                </Nav>
                <CreateEventForm
                >
                </CreateEventForm>
            </div>
        )
    }
}

export default CreateEvent;
