import React from 'react';
import Nav from "../components/mainpage/nav"
import MyAccountComponent from "../components/MyAccount/myAccount";
import axios from "axios";

class MyAccount extends React.Component {
    state = {
        loggedIn: true,
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
                    image: response.data[0].image
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
                    image: response.data.image
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        // LINE BELOW IS ONLY FOR TEST PURPOSES- userID SHOULD BE (SET IN LOCALSTORAGE, OR WHEREVER ELSE) BEFORE THIS PAGE)
        localStorage.setItem('userID', '5e40958807ed5f5d042f1701');
        // LINE ABOVE IS ONLY FOR TEST PURPOSES- userID SHOULD BE (SET IN LOCALSTORAGE, OR WHEREVER ELSE) BEFORE THIS PAGE)

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

    render() {
        return (
            <div>
                <Nav
                    loggedIn={this.state.loggedIn}
                    manageLogin={this.manageLogin}>
                </Nav>
                <MyAccountComponent
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    username={this.state.username}
                    email={this.state.email}
                    image={this.state.image}
                
                    handleInputChange={this.handleInputChange}
                    
                    handleFormSubmit={this.handleFormSubmit}
                />
            </div>
        )
    }
}

export default MyAccount;
