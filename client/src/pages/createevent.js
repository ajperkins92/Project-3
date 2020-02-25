import React from "react";
import Nav from "../components/mainpage/nav"
import CreateEventForm from "../components/CreateEventPage/createeventform"
import axios from "axios";

class CreateEvent extends React.Component {

    state = {
        loggedIn: localStorage.getItem("loggedIn"),
        userID: localStorage.getItem("userID"),
        username: localStorage.getItem("username"),
        userimage: localStorage.getItem("userImage"),
        eventName: "",
        address: "",
        date: "",
        time: "",
        description: "",
    }

    createEvent = () => {

        let formData = new FormData();
        formData.append("name", this.state.eventName);
        formData.append("address", localStorage.getItem("eventAddress"));
        formData.append("date", this.state.date);
        formData.append("time", this.state.time);
        formData.append("description", this.state.description);
        formData.append("organizer", this.state.username);
        formData.append("image", this.state.image);

        axios.post("/event", formData)
            .then((response) => {
                console.log(response);
                localStorage.setItem("eventAddress", "")
                window.location.replace("/");
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
        let value = event.target.value;

        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        this.createEvent();
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
                <CreateEventForm
                    handleInputChange={this.handleInputChange}
                    
                    handleFormSubmit={this.handleFormSubmit}
                    setImage={this.setImage}>
                </CreateEventForm>
            </div>
        )
    }
}

export default CreateEvent;
