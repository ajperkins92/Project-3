import React from 'react';
import Nav from "../components/mainpage/nav";
import ViewEventComponent from "../components/ViewEvent/viewEvent";
import { withRouter } from "react-router-dom";
import axios from 'axios';

class ViewEventAsIs extends React.Component {

    state = {
        loggedIn: localStorage.getItem('loggedIn'),
        eventToDisplay: "",
        attendees: [],
        userID: localStorage.getItem('userID')
    }

    getEventData = (eventID) => {
        axios.get(`/event/${eventID}`)
            .then((response) => {
                this.setState({
                    name: response.data.fromDB.name,
                    address: response.data.fromDB.address,
                    date: response.data.fromDB.date,
                    time: response.data.fromDB.time,
                    image: response.data.fromDB.image,
                    description: response.data.fromDB.description,
                    organizer: response.data.fromDB.organizer,
                    attendees: response.data.fromDB.attendees,
                    timeTo: response.data.time,
                });
                console.log(this.state);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.setState({ eventToDisplay: this.props.location.pathname.substr(12) }, () => {
            this.getEventData(this.state.eventToDisplay);
        });
    }

    attend = (userID, eventID) => {
        axios.put(`/signup/${eventID}`, {userID: userID})
            .then((response) => {
                console.log(response);
                // this.forceUpdate() not working like I expect... just doing page refresh
                window.location.reload();
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
                <ViewEventComponent
                    name={this.state.name}
                    address={this.state.address}
                    date={this.state.date}
                    time={this.state.time}
                    image={this.state.image}
                    description={this.state.description}
                    organizer={this.state.organizer}
                    // Expecting an array for attendees- join will make them into strings.  
                    attendees={(this.state.attendees.length === 0) ? "No Attendees Yet!" : this.state.attendees.join()}
                    timeTo={this.state.timeTo}
                    userID={this.state.userID}
                    eventID={this.state.eventToDisplay}
                    attend={this.attend}
                />
            </div>
        )
    }
}

const ViewEvent = withRouter(ViewEventAsIs);

export default ViewEvent;
