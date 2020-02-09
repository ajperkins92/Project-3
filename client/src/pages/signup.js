import React from 'react';
import Nav from "../components/mainpage/nav";
import SignUpPage from "../components/SignUpPage/signUpPage";
import axios from "axios";

class SignUp extends React.Component {

    state = {
        loggedIn: true,
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

    render() {
        return (
            <div>
                <Nav
                    loggedIn={this.state.loggedIn}
                    manageLogin={this.manageLogin}>
                </Nav>
                <SignUpPage
                handleInputChange={this.handleInputChange}
                value={this.state.searchZIP}
                handleFormSubmit={this.handleFormSubmit}>
                </SignUpPage>
            </div>
        )
    }
}

export default SignUp;
