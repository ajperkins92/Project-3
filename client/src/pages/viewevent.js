import React from "react";
import Nav from "../components/mainpage/nav";
import ViewEventComponent from "../components/ViewEvent/viewEvent";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class ViewEventAsIs extends React.Component {

    state = {
        loggedIn: localStorage.getItem("loggedIn"),
        eventToDisplay: "",
        attendees: [],
        userID: localStorage.getItem("userID"),
        administrator: false,
        editing: false,
        workaround: true,
        userimage: localStorage.getItem("userImage"),
    }

    getEventData = (eventID) => {
        axios.get(`/event/${eventID}`)
            .then((response) => {
                // BLOCK #1 FOR DEFAULT VALUE INPUT
                localStorage.setItem("eventName", response.data.fromDB.name);
                localStorage.setItem("eventAddress", response.data.fromDB.address);
                localStorage.setItem("eventDate", response.data.fromDB.date);
                localStorage.setItem("eventTime", response.data.fromDB.time);
                localStorage.setItem("eventDescription", response.data.fromDB.description);

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
                        this.setState({ administrator: true });
                    }
                    else {
                        console.log("Not an adminstrator");
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

    edit = () => {
        this.setState({ editing: true }, () => {
        })
    }

    cancel = () => {
        this.setState({ editing: false }, () => {

        })
    }

    delete = (eventID) => {
        axios.delete(`/event/${eventID}`)
            .then((response) => {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    attend = (userID, eventID) => {
        axios.put(`/signup/${eventID}`, { userID: userID })
            .then((response) => {
                console.log(response)
                this.getEventData(this.state.eventToDisplay);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    changeEventDetails = (eventID, changes) => {
        axios.put(`/event/${eventID}`, changes)
            .then((response) => {
                this.setState({
                    name: response.data.name,
                    address: response.data.address,
                    date: response.data.date,
                    time: response.data.time,
                    image: response.data.image.url,
                    description: response.data.description,
                });
                // BLOCK #2 FOR DEFAULT VALUE INPUT
                localStorage.removeItem("eventName");
                localStorage.removeItem("eventAddress");
                localStorage.removeItem("eventDate");
                localStorage.removeItem("eventTime");
                localStorage.removeItem("eventDescription");
                this.getEventData(this.state.eventToDisplay);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    setImage = event => {
        this.setState({ uploadedimage: event.target.files[0] })
    }

    handleInputChange = event => {
        const name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        let formData = new FormData();
        // BLOCK #3 FOR DEFAULT VALUE INPUT
        formData.append("name", (this.state.newname === undefined) ? localStorage.getItem("eventName") : this.state.newname);
        formData.append("address", (this.state.newaddress === undefined) ? localStorage.getItem("eventAddress") : this.state.newaddress);
        formData.append("date", (this.state.newdate === undefined) ? localStorage.getItem("eventDate") : this.state.newdate);
        formData.append("time", (this.state.newtime === undefined) ? localStorage.getItem("eventTime") : this.state.newtime);
        formData.append("description", (this.state.newdescription === undefined) ? localStorage.getItem("eventDescription") : this.state.newdescription);
        formData.append("image", this.state.uploadedimage);

        this.changeEventDetails(this.state.eventToDisplay, formData);
    };

    manageLogin = () => {
        if (this.state.loggedIn === "true") {
            localStorage.setItem("username", "");
            localStorage.setItem("loggedIn", "false");
            localStorage.setItem("userID", "");
            localStorage.setItem("userImage", "");
            this.setState({username: "", loggedIn: "false", userID: ""});
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
                            <div className="attendeeDiv" style={{ verticalalign: "middle", padding: "5px"}}>
                                <div style={{paddingBottom: "2px"}}>{each.username + " "}</div>
                                <img src={each.image} alt="2013 Toyota Tacoma" className="attendeeImg" style={{ height: "50px", width: "50px", objectFit: "cover" }}></img>
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
