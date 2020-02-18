import React from 'react';
import Nav from "../components/mainpage/nav"
import MyAccountComponent from "../components/MyAccount/myAccount";
import axios from "axios";

class MyAccount extends React.Component {
    state = {
        loggedIn: localStorage.getItem('loggedIn'),
        userID: "",

        username: "",
        firstname: "",
        lastname: "",
        password: "",
        email: "",
        image: "",

        // newusername: "",
        newfirstname: "",
        newlastname: "",
        newpassword: "",
        newemail: "",
        newimage: "",

        userimage: localStorage.getItem('userImage'),
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
                    image: localStorage.getItem('userImage')
                });
                console.log(this.state);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // this will PUT new details that will overwrite what the user has in DB, then return new details on screen
    changeUserDetails = (userIDFromState, changesToUser) => {
        axios.put(`/user/${userIDFromState}`, changesToUser)
            .then((response) => {
                this.setState({
                    // username: response.data.username,
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    email: response.data.email,
                    image: response.data.image.url
                }, () => localStorage.setItem('userImage', response.data.image.url));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {

        // found that callback was needed after setting State in order to use function to lookup user using state (async issue solved)
        this.setState({ userID: localStorage.getItem('userID') }, () => {
            this.getUserDetails(this.state.userID);
        }
        )

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
        let changes = {}
        changes.firstname = this.state.newfirstname;
        changes.lastname = this.state.newlastname;
        // changes.username = this.state.newusername;
        changes.password = this.state.newpassword;
        changes.email = this.state.newemail;
        changes.image = this.state.newimage;
        console.log(this.state.userID, changes)
        this.changeUserDetails(this.state.userID, changes);
    };

    manageLogin = () => {
        if (this.state.loggedIn === "true") {
            // if you're logged in, log out in localstorage, as well as this page's state
            
            
            localStorage.setItem('username', "");
            localStorage.setItem('loggedIn', "false");
            localStorage.setItem('userID', "");
            localStorage.setItem('userImage', "");
            this.setState({username: "", loggedIn: "false", userID: ""});
            
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
                    manageLogin={this.manageLogin}
                    href={this.state.href}>
                </Nav>
                <MyAccountComponent
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    username={this.state.username}
                    email={this.state.email}
                    image={this.state.userimage}
                
                    handleInputChange={this.handleInputChange}
                    
                    handleFormSubmit={this.handleFormSubmit}
                />
            </div>
        )
    }
}

export default MyAccount;
