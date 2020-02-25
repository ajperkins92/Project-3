import React from "react";
import Nav from "../components/mainpage/nav"
import MyAccountComponent from "../components/MyAccount/myAccount";
import OurModal from "../components/SignUpPage/modal"
import axios from "axios";

class MyAccount extends React.Component {
    state = {
        loggedIn: localStorage.getItem("loggedIn"),
        userID: "",

        username: "",
        firstname: "",
        lastname: "",
        password: "",
        email: "",
        image: "",

        newfirstname: "",
        newlastname: "",
        newpassword: "",
        newemail: "",
        newimage: "",

        visible: false,

    }

    // this will GET details that are already saved in DB
    getUserDetails = (userIDFromState) => {
        axios.get(`/user/${userIDFromState}`)
            .then((response) => {
                // data was returned as response.data, which is an array.  
                this.setState({
                    username: response.data[0].username,
                    firstname: response.data[0].firstname,
                    lastname: response.data[0].lastname,
                    email: response.data[0].email,
                    image: localStorage.getItem("userImage")
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    changeUserDetails = (userIDFromState, changesToUser) => {
        axios.put(`/user/${userIDFromState}`, changesToUser)
            .then((response) => {
                console.log(response);
                this.setState({
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    email: response.data.email,
                    image: response.data.image.url,
                    missingdetails: false
                }, () => {
                    localStorage.setItem("userImage", response.data.image.url, () => {
                        this.getUserDetails(this.state.userID)
                    })
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        // found that callback was needed after setting State in order to use function to lookup user using state (async issue solved)
        this.setState({ userID: localStorage.getItem("userID") }, () => {
            this.getUserDetails(this.state.userID)});
    }

    openModal = () => {
        this.setState({
            visible: true
        });
    }

    closeModal = () => {
        this.setState({
            visible: false
        });
    }

    setImage = event => {
        this.setState({ newimage: event.target.files[0] })
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

        let arrayWithNewData = [
            this.state.newfirstname,
            this.state.newlastname,
            this.state.newpassword,
            this.state.newemail,
        ];

        let missingData = false;

        for (let i = 0; i < arrayWithNewData.length; i++) {
            if (missingData === true) {
                break;
            }
            else {
                if (!arrayWithNewData[i]) {
                    missingData = true;
                }
            }
        }

        if (missingData === true) {
            this.openModal();
        }
        else {
            let formData = new FormData();
            formData.append("firstname", this.state.newfirstname);
            formData.append("lastname", this.state.newlastname);
            formData.append("password", this.state.newpassword);
            formData.append("email", this.state.newemail);
            formData.append("image", this.state.newimage);

            this.changeUserDetails(this.state.userID, formData);
        }
    };

    manageLogin = () => {
        if (this.state.loggedIn === "true") {
            localStorage.setItem("username", "");
            localStorage.setItem("loggedIn", "false");
            localStorage.setItem("userID", "");
            localStorage.setItem("userImage", "");
            this.setState({ username: "", loggedIn: "false", userID: "" });
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
                <MyAccountComponent
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    username={this.state.username}
                    email={this.state.email}
                    image={this.state.image}

                    handleInputChange={this.handleInputChange}

                    handleFormSubmit={this.handleFormSubmit}

                    setImage={this.setImage}
                />
                <OurModal
                    visible={this.state.visible}
                    open={this.openModal}
                    close={this.closeModal}
                    messageheader="One or more input fields is missing."
                    message="Please complete all fields, then try again."
                    color="orangered">
                </OurModal>

            </div>
        )
    }
}

export default MyAccount;
