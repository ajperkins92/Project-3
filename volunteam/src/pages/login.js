import React from 'react';
import Nav from "../components/mainpage/nav"


class Login extends React.Component {

    state = {
        loggedIn: true,

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
        this.searchEventsByZIP(this.state.searchZIP);
    };


    render() {
        return (
            <div>
                <Nav
                    loggedIn={this.state.loggedIn}
                    manageLogin={this.manageLogin}>
                </Nav>
                
            </div>
        )
    }
}

export default Login;
