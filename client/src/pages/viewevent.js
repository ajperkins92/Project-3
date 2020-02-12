import React from 'react';
import Nav from "../components/mainpage/nav";
import ViewEventComponent from "../components/ViewEvent/viewEvent";
import {withRouter} from "react-router-dom";

class ViewEventAsIs extends React.Component {

    state = {
        loggedIn: localStorage.getItem('loggedIn'),
    }

    componentDidMount() {
        console.log(this.props.location);
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

const ViewEvent = withRouter(ViewEventAsIs);

export default ViewEvent;
