import React from 'react';
import Nav from "../components/mainpage/nav"
// import ViewMyEventsHeader from "../components/ViewMyEventsPage/ViewMyEventsHeader"


class MyEvents extends React.Component {

    state = {
        loggedIn: localStorage.getItem('loggedIn'),
    }

    render() {
        return (
            <div>
                <Nav
                    loggedIn={this.state.loggedIn}
                    manageLogin={this.manageLogin}>
                </Nav>

                {/* <ViewMyEventsHeader></ViewMyEventsHeader> */}

                
            </div>
        )
    }
}

export default MyEvents;
