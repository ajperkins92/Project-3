import React from "react";
import Nav from "../components/mainpage/nav"
import Statement from "../components/mainpage/statement"
import SearchBar from "../components/mainpage/searchbar"
import CreateCard from "../components/mainpage/createcard"
import OtherCards from "../components/mainpage/othercards"
import Carousel from "../components/mainpage/carousel"
import axios from "axios"
import OurModal from "../components/SignUpPage/modal"
import { Link, withRouter } from "react-router-dom";

class Main extends React.Component {

    state = {
        loggedIn: localStorage.getItem("loggedIn"),
        searchZIP: "",
        eventResults: [
        ],
        href: "/",
        userimage: localStorage.getItem("userImage"),
        searchquery: "",
        noresults: false,
        visible: false,
    }

    componentDidMount() {
        this.getRandomEvents();
    }

    getRandomEvents = () => {
        axios.get("/event")
            .then((response) => {
                this.setState({ eventResults: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getRandomEvents();
    }

    searchEvents = (query) => {
        axios.get(`/search/?q=${query}`)
            .then((response) => {
                if (typeof response.data === "string") {
                    this.openModal();
                    this.getRandomEvents();
                }
                else {
                    this.setState({ eventResults: response.data });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        this.searchEvents(this.state.searchquery);
    };

    openModal = () => {
        this.setState({
            visible : true
        });
    }
 
    closeModal = () => {
        this.setState({
            visible : false
        });
    }

    manageLogin = () => {
        if (this.state.loggedIn === "true") {
            localStorage.setItem("username", "");
            localStorage.setItem("loggedIn", "false");
            localStorage.setItem("userID", "");
            localStorage.setItem("userImage", "");
            this.setState({username: "", loggedIn: "false", userID: ""});
        }
    }

    render() {
        return (
            <div>
                <Nav
                    loggedIn={this.state.loggedIn}
                    manageLogin={this.manageLogin}
                    href={this.state.href}>
                </Nav>
                <div className="container-main">
                    <SearchBar
                        handleInputChange={this.handleInputChange}
                        
                        handleFormSubmit={this.handleFormSubmit}>
                    </SearchBar>
                    <div className="row">
                    <CreateCard
                    loggedIn={this.state.loggedIn}></CreateCard>
                    {this.state.eventResults.map( (each) => (
                        
                        <OtherCards
                        image={each.image.url}
                        eventName={each.name}
                        eventID={each._id}
                        date={each.date}
                        description={each.description}>
                            
                        </OtherCards>
                    ))}
                    </div>
                </div>
                <OurModal
                visible={this.state.visible}
                open={this.openModal}
                close={this.closeModal}
                messageheader={"No Results..."}
                message={"Please try searching for other events."}
                color={"orangered"}>

                </OurModal>
            </div>
        )
    }
}

export default Main;
