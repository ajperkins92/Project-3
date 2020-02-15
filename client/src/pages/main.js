import React from 'react';
import Nav from "../components/mainpage/nav"
import Statement from "../components/mainpage/statement"
import SearchBar from "../components/mainpage/searchbar"
import CreateCard from "../components/mainpage/createcard"
import OtherCards from "../components/mainpage/othercards"
import Carousel from "../components/mainpage/carousel"
import axios from "axios"
import { Link, withRouter } from "react-router-dom";

class Main extends React.Component {

    state = {
        loggedIn: localStorage.getItem('loggedIn'),
        searchZIP: "",
        // we should probably limit this to like 5-10 elements
        eventResults: [
            // {
            //     name: "Event #1",
            //     image: "https://res.cloudinary.com/nrpadev/image/upload/c_fill,f_auto,q_70/2018-November-Feature-Seattle-Innovation-Lab-410.jpg",
            //     id: "ID from Mongo."
            // },
            // {
            //     name: "Event #2",
            //     image: "https://www.washingtonpost.com/resizer/Va-uo43mkf0HpH9NiTqn_G_WDEU=/480x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/D6USWTUFUII6THLT4K5GXPY3TM.jpg",
            //     id: "ID from Mongo.."
            // },
            // {
            //     name: "Event #3",
            //     image: "https://cms.capitoltechsolutions.com/ClientData/EffieYeaw/uploads/morning.jpg",
            //     id: "ID from Mongo..."
            // },
        ],
        href: "/",
    }

    componentDidMount() {
        this.getRandomEvents();
    }

    getRandomEvents = () => {
        axios.get("/event")
            .then((response) => {
                // console.log(`event id is ${JSON.stringify(response.data[0]._id)}`);
                this.setState({ eventResults: response.data });
                console.log(this.state.eventResults);
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getRandomEvents();
    }

    searchEventsByZIP = (zip) => {
        console.log(`Under Construction, but zip being searched is ${zip}`);
        console.log(`Need a new route that gets events by ZIP- may need to change schema to include ZIP, then write an algo for 
        determining which ZIP's are closest to yours`);
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
        this.searchEventsByZIP(this.state.searchZIP);
    };

    manageLogin = () => {
        if (this.state.loggedIn === "true") {
            // if you're logged in, log out in localstorage, as well as this page's state
            
            
            localStorage.setItem('username', "");
            localStorage.setItem('loggedIn', "false");
            localStorage.setItem('userID', "");
            this.setState({username: "", loggedIn: "false", userID: ""});
            
        }
        else {
            // Do nothing:  The reason is:
            // If you're not logged in, let the anchor href take you to the login page, but don't manage any state with the current page
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
                <div className="container">
                    <Statement></Statement>
                    <SearchBar
                        handleInputChange={this.handleInputChange}
                        
                        handleFormSubmit={this.handleFormSubmit}>
                    </SearchBar>
                    <div className="row">
                    <CreateCard></CreateCard>
                    {this.state.eventResults.map( (each) => (
                        
                        <OtherCards
                        image={each.image}
                        eventName={each.name}
                        eventID={each._id}
                        date={each.date}
                        description={each.description}>
                            
                        </OtherCards>
                    ))}
                    </div>
                </div>
                <Carousel></Carousel>
            </div>
        )
    }
}

export default Main;
