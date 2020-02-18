import React from 'react';
import Nav from "../components/mainpage/nav";
import ViewEventComponent from "../components/ViewEvent/viewEvent";
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

class ViewEventAsIs extends React.Component {

    state = {
        loggedIn: localStorage.getItem('loggedIn'),
        eventToDisplay: "",
        attendees: [],
        userID: localStorage.getItem('userID'),
        administrator: false,
        editing: false,
        workaround: true,
        userimage: localStorage.getItem('userImage'),
    }

    getEventData = (eventID) => {
        axios.get(`/event/${eventID}`)
            .then((response) => {

                let attendeesArray = [];

                for (let i = 0; i < response.data.fromDB.attendees.length; i++) {
                    attendeesArray.push(response.data.fromDB.attendees[i].username);
                }

                this.setState({
                    name: response.data.fromDB.name,
                    address: response.data.fromDB.address,
                    date: response.data.fromDB.date,
                    time: response.data.fromDB.time,
                    image: response.data.fromDB.image,
                    description: response.data.fromDB.description,
                    organizer: response.data.fromDB.organizerId,
                    organizername: response.data.fromDB.organizer,
                    attendees: attendeesArray,
                    timeTo: response.data.time,
                }, () => {
                    if (this.state.organizer === this.state.userID) {
                        this.setState({ administrator: true }, () => {
                            console.log(`Adminstrator?  ${this.state.administrator}`);
                            console.log(`Editing?  ${this.state.editing}`);
                        });
                    }
                    else {
                        console.log("Not an adminstrator");
                        console.log(`Editing?  ${this.state.editing}`);
                    }
                });
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

    edit = (userID, eventID) => {
        this.setState({ editing: true }, () => {
            console.log(`editing is now ${this.state.editing}`)
        })
    }

    cancel = () => {
        this.setState({ editing: false }, () => {
            console.log(`editing is now ${this.state.editing}`)
        })
    }

    delete = (eventID) => {
        axios.delete(`/event/${eventID}`)
            .then((response) => {
                console.log(response);
                // window.location.replace("/myevents");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    attend = (userID, eventID) => {
        axios.put(`/signup/${eventID}`, { userID: userID })
            .then((response) => {
                console.log(response);
                // this.forceUpdate() not working like I expect... just doing page refresh
                // window.location.replace(`/view/event/${this.props.location.pathname.substr(12)}`);
                // window.location.reload();
                this.getEventData(this.state.eventToDisplay);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    changeEventDetails = (eventID, changes) => {
        axios.put(`/event/${eventID}`, changes)
            .then((response) => {
                console.log(`response.data is ${JSON.stringify(response.data)}`);
                this.setState({
                    name: response.data.name,
                    address: response.data.address,
                    date: response.data.date,
                    time: response.data.time,
                    // NOT DOING IMAGE YET
                    description: response.data.description,
                });
                // , () => window.location.reload());
                this.getEventData(this.state.eventToDisplay);
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
        let changes = {}
        changes.name = this.state.newname;
        changes.description = this.state.newdescription;
        changes.date = this.state.newdate;
        changes.time = this.state.newtime;
        changes.address = this.state.newaddress;
        // NOT HANDLING IMAGE YET
        console.log(changes)
        this.changeEventDetails(this.state.eventToDisplay, changes);
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

    // manageLogin = () => {
    //     if (this.state.loggedIn === "true") {
    //         // if you're logged in, log out in localstorage, as well as this page's state

    //         window.location.replace("/");
    //         localStorage.setItem('username', "");
    //         localStorage.setItem('loggedIn', "false");
    //         localStorage.setItem('userID', "");
    //         this.setState({ username: "", loggedIn: "false", userID: "" });

    //     }
    //     else {
    //         // Do nothing:  The reason is:
    //         window.location.replace("/loginpage");
    //         // If you're not logged in, let the anchor href take you to the login page, but don't manage any state with the current page
    //     }
    // }

    render() {
        return (
            <div>
                <Nav
                    loggedIn={this.state.loggedIn}
                    manageLogin={this.manageLogin}
                    href={this.state.href}>
                </Nav>
                <ViewEventComponent
                    name={this.state.name}
                    address={this.state.address}
                    date={this.state.date}
                    time={this.state.time}
                    image={this.state.image}
                    description={this.state.description}
                    organizer={this.state.organizer}
                    organizername={this.state.organizername}
                    // Expecting an array for attendees- join will make them into strings.  
                    attendees={(this.state.attendees.length === 0) ? "No Attendees Yet!" : this.state.attendees.join()}
                    timeTo={this.state.timeTo}
                    userID={this.state.userID}
                    eventID={this.state.eventToDisplay}
                    attend={this.attend}
                    admin={this.state.administrator}
                    edit={this.edit}
                    cancel={this.cancel}
                    editing={this.state.editing}
                    delete={this.delete}
                    handleInputChange={this.handleInputChange}
                    handleFormSubmit={this.handleFormSubmit}
                    
                />
            </div>
        )
    }
}

const ViewEvent = withRouter(ViewEventAsIs);

export default ViewEvent;
