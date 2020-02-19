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
                    let userInfoPacket = {};
                    userInfoPacket.username = response.data.fromDB.attendees[i].username;
                    userInfoPacket.image = response.data.fromDB.attendees[i].image.url;
                    attendeesArray.push(userInfoPacket);
                }

                this.setState({
                    name: response.data.fromDB.name,
                    address: response.data.fromDB.address,
                    date: response.data.fromDB.date,
                    time: response.data.fromDB.time,
                    image: response.data.fromDB.image.url,
                    description: response.data.fromDB.description,
                    organizer: response.data.fromDB.organizerId,
                    organizername: response.data.fromDB.organizer,
                    attendees: attendeesArray,
                    timeTo: response.data.time,
                }, () => {
                    console.log(`attendees array ${this.state.attendees}`)
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
                    image: response.data.image.url,
                    description: response.data.description,
                });
                // , () => window.location.reload());
                this.getEventData(this.state.eventToDisplay);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    setImage = event => {
        this.setState({image: event.target.files[0]})
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

        let formData = new FormData();
        formData.append("name", this.state.newname);
        formData.append("address", this.state.newaddress);
        formData.append("date", this.state.newdate);
        formData.append("time", this.state.newtime);
        formData.append("description", this.state.newdescription);
        formData.append("image", this.state.image);

        console.log(`image sending to backend is ${this.state.image}`)

        this.changeEventDetails(this.state.eventToDisplay, formData);
    };

    manageLogin = () => {
        if (this.state.loggedIn === "true") {
            // if you're logged in, log out in localstorage, as well as this page's state


            localStorage.setItem('username', "");
            localStorage.setItem('loggedIn', "false");
            localStorage.setItem('userID', "");
            localStorage.setItem('userImage', "");
            this.setState({ username: "", loggedIn: "false", userID: "" });

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

                    attendees={(this.state.attendees.length === 0) ? "No Attendees Yet!" : this.state.attendees.map(
                        (each) =>
                            <div style={{ verticalalign: "middle" }}>
                                {each.username + " "}
                                <img src={each.image} alt="2013 Toyota Tacoma" className="attendeeImg" style={{ height: "50px", width: "50px" }}></img>
                            </div>
                    )
                    }
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
                    setImage={this.setImage}

                />
            </div>
        )
    }
}

const ViewEvent = withRouter(ViewEventAsIs);

export default ViewEvent;
