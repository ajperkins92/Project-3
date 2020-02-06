import React from 'react';
import Nav from "../components/nav"

class Main extends React.Component {

    state = {
        loggedIn: true,
    }

    render() {
        return (
            <div>
                <Nav
                loggedIn={this.state.loggedIn}>
                </Nav>
            </div>
        )
    }
}

export default Main;
