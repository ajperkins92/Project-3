import React from 'react';
import Nav from "../components/mainpage/nav"
import LogInPageComponent from "../components/LogInPage/logInPage";
import axios from "axios"

class Login extends React.Component {
    state = {
        loggedIn: false,
        username: "",
        password: ""
    }

    login = (credentials) => {
        console.log("logging in..")
        axios.post("/login", credentials)
        .then((response) => {
            console.log(response);
            this.setState({loggedIn: true});
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
        let loginInput = {};
        loginInput.username = this.state.username;
        loginInput.password = this.state.password;
        this.login(loginInput);
    };

    render() {
        return (
            <div>
                <Nav
                    loggedIn={this.state.loggedIn}
                    manageLogin={this.manageLogin}>
                </Nav>
                <LogInPageComponent
                handleInputChange={this.handleInputChange}
                
                handleFormSubmit={this.handleFormSubmit}>
                </LogInPageComponent>
            </div>
        )
    }
}

export default Login;
