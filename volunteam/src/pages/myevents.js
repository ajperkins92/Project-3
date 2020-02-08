import React from 'react';
import Nav from "../components/mainpage/nav"


class MyEvents extends React.Component {

    state = {
        loggedIn: true,
    }




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

export default MyEvents;
