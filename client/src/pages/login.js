import React from "react";
import Nav from "../components/mainpage/nav"
import LogInPageComponent from "../components/LogInPage/logInPage";
import OurModal from "../components/SignUpPage/modal";
import axios from "axios"
import { Link, withRouter } from "react-router-dom";

class Login extends React.Component {
    state = {
        loggedIn: false,
        username: "",
        password: "",
        visible: false
    }

    login = (credentials) => {
        let that = this;
        axios.post("/login", credentials)
        .then((response) => {

            localStorage.setItem("userID", response.data.id);
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("userImage", response.data.image);

            this.setState({loggedIn: true}, () => {
                localStorage.setItem("loggedIn", true);
                window.location.replace("/");
            });
        
        })
        .catch(function (error) {
            that.handleModal();
        });
    }

    handleModal = () => {
        this.setState({visible: true})
    }

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
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

    openModal = () => {
        this.setState({
            visible : true
        });
    }
 
    closeModal = () => {
        this.setState({
            visible : false
        });
    }

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
                <LogInPageComponent
                handleInputChange={this.handleInputChange}
                login={this.login}
                bypassLogin={this.bypassLogin}
                handleFormSubmit={this.handleFormSubmit}>
                </LogInPageComponent>
                <OurModal
                visible={this.state.visible}
                open={this.openModal}
                close={this.closeModal}
                messageheader="Incorrect Login Info"
                message="Either your username or password is incorrect.  Please try again."
                color="orangered">
                </OurModal>
            </div>
        )
    }
}

export default Login;
