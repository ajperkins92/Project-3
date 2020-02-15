import React from 'react';
import Nav from "../components/mainpage/nav"
import LogInPageComponent from "../components/LogInPage/logInPage";
import axios from "axios"
import { Link, withRouter } from "react-router-dom";

class Login extends React.Component {
    state = {
        loggedIn: false,
        username: "",
        password: ""
    }

    login = (credentials) => {
        console.log("logging in..")
        console.log(`credentials are ${JSON.stringify(credentials)}`)
        axios.post("/login", credentials)
        .then((response) => {
            console.log(response.data.id);

            localStorage.setItem('userID', response.data.id);
            localStorage.setItem('username', response.data.username);

            this.setState({loggedIn: true}, () => {
                localStorage.setItem('loggedIn', true)
                window.location.replace("/")
            });
        
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

    // bypassLogin = () => {
    //     localStorage.setItem('loggedIn', true)
    //     // LINE BELOW IS ONLY FOR TEST PURPOSES- userID SHOULD BE (SET IN LOCALSTORAGE, OR WHEREVER ELSE) BEFORE THIS PAGE)
    //     // localStorage.setItem('userID', '5e436e80f7733e256c080ebd');
    //     // LINE ABOVE IS ONLY FOR TEST PURPOSES- userID SHOULD BE (SET IN LOCALSTORAGE, OR WHEREVER ELSE) BEFORE THIS PAGE)

    //     // used by Kensen

    //     localStorage.setItem('userID', '5e40ba4146ece80cd40f746a');

    //     this.setState({loggedIn: true});
    //     window.location.replace("/");
    // }

    manageLogin = () => {
        if (this.state.loggedIn === "true") {
            // if you're logged in, log out in localstorage, as well as this page's state
            
            window.location.replace("/");
            localStorage.setItem('username', "");
            localStorage.setItem('loggedIn', "false");
            localStorage.setItem('userID', "");
            this.setState({username: "", loggedIn: "false", userID: ""});

        }
        else {
            // Do nothing:  The reason is:
            window.location.replace("/loginpage");
            // If you're not logged in, let the anchor href take you to the login page, but don't manage any state with the current page
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
                <LogInPageComponent
                handleInputChange={this.handleInputChange}
                login={this.login}
                bypassLogin={this.bypassLogin}
                handleFormSubmit={this.handleFormSubmit}>
                </LogInPageComponent>
            </div>
        )
    }
}

export default Login;
