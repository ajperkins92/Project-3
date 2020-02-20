import React from 'react';
import Nav from "../components/mainpage/nav";
import SignUpPage from "../components/SignUpPage/signUpPage";
import axios from "axios";
import OurModal from "../components/SignUpPage/modal";

class SignUp extends React.Component {

    state = {
        loggedIn: localStorage.getItem('loggedIn'),
        username: "",
        firstname: "",
        lastname: "",
        password: "",
        email: "",
        image: "",
        visible: false,
        success: false,
    }

    signUp = () => {
        // image uploads to multer need FormData - can't just send an object with items from state
        let formData = new FormData();
        formData.append("username", this.state.username);
        formData.append("firstname", this.state.firstname);
        formData.append("lastname", this.state.lastname);
        formData.append("password", this.state.password);
        formData.append("email", this.state.email);
        formData.append("image", this.state.image);

        axios.post("/user", formData)
            .then((response) => {
                console.log(response);
                if (response.data.error) {
                    this.setState({failureMessage: response.data.error}, () => this.openModal());
                }
                else {
                    this.setState({success: true}, () => this.openModal());
                }
                
            })
            .catch(function (error) {
                console.log(`backend error is`)
                console.log(error);
            });
    }

    // fileInput = () => {
    //     React.createRef();
    //     console.log("file input fired")
    // }

    setImage = event => {
        this.setState({image: event.target.files[0]})
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

    handleFormSubmit = event => {
        event.preventDefault();
        // let newUser = {}
        // newUser.username = this.state.username;
        // newUser.firstname = this.state.firstname;
        // newUser.lastname = this.state.lastname;
        // newUser.password = this.state.password;
        // newUser.email = this.state.email;
        // newUser.image = this.state.image;
        this.signUp();
        // this.signUp(newUser);
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
                <SignUpPage
                    handleInputChange={this.handleInputChange}
                    handleFormSubmit={this.handleFormSubmit}
                    setImage={this.setImage}>
                </SignUpPage>
                <OurModal
                visible={this.state.visible}
                open={this.openModal}
                close={this.closeModal}
                messageheader={(this.state.success === true) ? "Success!" : "Account Creation Failure"}
                message={(this.state.success === true) ? `Please login at the top of the page.` : this.state.failureMessage}
                color={(this.state.success === true) ? "limegreen" : "orangered"}>
                </OurModal>
            </div>
        )
    }
}

export default SignUp;
