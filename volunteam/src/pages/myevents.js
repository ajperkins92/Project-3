import React from 'react';
import Nav from "../components/mainpage/nav"
import ViewMyEventsHeader from "../components/ViewMyEventsPage/ViewMyEventsHeader"

// Adds comment to log a change to this file

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

                <ViewMyEventsHeader></ViewMyEventsHeader>

                
            </div>
        )
    }
}

export default MyEvents;
