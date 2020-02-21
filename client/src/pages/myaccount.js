import React from 'react';
import Nav from "../components/mainpage/nav"
import MyAccountComponent from "../components/MyAccount/myAccount";
import OurModal from "../components/SignUpPage/modal"
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
                console.log(response);
                this.setState({
                    // username: response.data.username,
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    email: response.data.email,
                    image: response.data.image.url,
                    missingdetails: false
                }, () => {

                    localStorage.setItem('userImage', response.data.image.url, () => {
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
        this.setState({ userID: localStorage.getItem('userID') }, () => {
            this.getUserDetails(this.state.userID);
        }
        )
    }

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

    setImage = event => {
        this.setState({ newimage: event.target.files[0] })
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

        let arrayWithNewData = [
            this.state.newfirstname,
            this.state.newlastname,
            this.state.newpassword,
            this.state.newemail,
        ];

        let missingData = false;

        console.log(`array is ${arrayWithNewData}`)

        console.log(`index 0 ${!arrayWithNewData[0] }`)
        console.log(`index 1 ${!arrayWithNewData[1] }`)
        console.log(`index 2 ${!arrayWithNewData[2] }`)
        console.log(`index 3 ${!arrayWithNewData[3] }`)


        for (let i = 0; i < arrayWithNewData.length; i++) {
            if (missingData === true) {
                console.log(`Missing field- Leaving (2nd)`);
                break;
            }
            else {
                if (!arrayWithNewData[i]) {
                    missingData = true;
                    console.log(`Missing field- (1st)`);
                }
            }
        }

        if (missingData=== true) {
            this.openModal();
        }
        else {
            console.log(`all is good- going to PUT`);

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
            // if you're logged in, log out in localstorage, as well as this page's state


            localStorage.setItem('username', "");
            localStorage.setItem('loggedIn', "false");
            localStorage.setItem('userID', "");
            localStorage.setItem('userImage', "");
            this.setState({ username: "", loggedIn: "false", userID: "" });

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
