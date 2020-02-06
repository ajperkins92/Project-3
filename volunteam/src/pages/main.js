import React from 'react';
import Nav from "../components/mainpage/nav"
import Statement from "../components/mainpage/statement"
import SearchBar from "../components/mainpage/searchbar"

class Main extends React.Component {

    state = {
        loggedIn: true,
        searchZIP: "",
    }

    searchEvents = (zip) => {
        console.log(`Under Construction, but zip being searched is ${zip}`);
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
        this.searchEvents(this.state.searchZIP);
    };

    render() {
        return (
            <div>
                <Nav
                    loggedIn={this.state.loggedIn}>
                </Nav>
                <div className="container">
                    <Statement></Statement>
                    <SearchBar
                        handleInputChange={this.handleInputChange}
                        value={this.state.searchZIP}
                        handleFormSubmit={this.handleFormSubmit}>
                    </SearchBar>
                    <div className="row">

                    </div>
                </div>
            </div>
        )
    }
}

export default Main;
