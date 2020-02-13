import React from 'react';
import Nav from "../components/mainpage/nav";
import SignUpPage from "../components/SignUpPage/signUpPage";
import axios from "axios";
import Modal from "../components/SignUpPage/modal"

class SignUp extends React.Component {

    state = {
        loggedIn: localStorage.getItem('loggedIn'),
        username: "",
        firstname: "",
        lastname: "",
        password: "",
        email: "",
        image: "",
    }

    signUp = (newUserDetails) => {
        axios.post("/user", newUserDetails)
            .then((response) => {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

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
        let newUser = {}
        newUser.username = this.state.username;
        newUser.firstname = this.state.firstname;
        newUser.lastname = this.state.lastname;
        newUser.password = this.state.password;
        newUser.email = this.state.email;
        newUser.image = this.state.image;
        this.signUp(newUser);
    };

    manageLogin = () => {
        if (this.state.loggedIn === "true") {
            // if you're logged in, log out in localstorage, as well as this page's state
            localStorage.setItem('loggedIn', "false");
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
                    manageLogin={this.manageLogin}>
                </Nav>
                <SignUpPage
                    handleInputChange={this.handleInputChange}

                    handleFormSubmit={this.handleFormSubmit}>
                </SignUpPage>
            </div>
        )
    }
}

export default SignUp;
