import React from 'react';
import Nav from "../components/mainpage/nav"
import ViewEventPageComponent from "../components/ViewEventPage/viewEventPage";

class ViewEvent extends React.Component {

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
                
                <ViewEventPageComponent />

            </div>
        )
    }
}

export default ViewEvent;
