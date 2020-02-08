import React from 'react';
import Nav from "../components/mainpage/nav"
import ViewMyEventsHeader from "../components/ViewMyEventsPage/ViewMyEventsHeader"

<<<<<<< HEAD
// Adds comment to log a change to this file
=======
// Adds a change to log to myevents.js
>>>>>>> 98b1a0c569104999163c8684d611b69a7a34e99b

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
