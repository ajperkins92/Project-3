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
            localStorage.setItem('loggedIn', true);

            // this line of code below to be handled with authentication, need to set userID to the userID found in mongoDB based on credentials
            // localStorage.setItem('userID', '5e40958807ed5f5d042f1701');
            // this line of code above to be handled with authentication, need to set userID to the userID found in mongoDB based on credentials

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

    bypassLogin = () => {
        localStorage.setItem('loggedIn', true)
        // LINE BELOW IS ONLY FOR TEST PURPOSES- userID SHOULD BE (SET IN LOCALSTORAGE, OR WHEREVER ELSE) BEFORE THIS PAGE)
        localStorage.setItem('userID', '5e40958807ed5f5d042f1701');
        // LINE ABOVE IS ONLY FOR TEST PURPOSES- userID SHOULD BE (SET IN LOCALSTORAGE, OR WHEREVER ELSE) BEFORE THIS PAGE)
        this.setState({loggedIn: true});
        window.location.replace("/");
    }

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
                <LogInPageComponent
                handleInputChange={this.handleInputChange}
                bypassLogin={this.bypassLogin}
                handleFormSubmit={this.handleFormSubmit}>
                </LogInPageComponent>
            </div>
        )
    }
}

export default Login;
