import React from 'react';
import Nav from "../components/mainpage/nav";
import ViewEventComponent from "../components/ViewEvent/viewEvent";


class ViewEvent extends React.Component {

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
                <ViewEventComponent />

            </div>
        )
    }
}

export default ViewEvent;
