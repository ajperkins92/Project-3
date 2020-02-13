import React from 'react';
import Nav from "../components/mainpage/nav"
import ViewMyEventsHeader from "../components/ViewMyEventsPage/ViewMyEventsHeader"
import OtherCards from "../components/mainpage/othercards"


class MyEvents extends React.Component {

    state = {
        loggedIn: localStorage.getItem('loggedIn'),
        userID: localStorage.getItem('userID'),
        registeredEvents: [],
        organizedEvents: [],
    }

    componentDidMount() {

    }

    getYourEvents = () => {

    }

    render() {
        return (
            <div>
                <Nav
                    loggedIn={this.state.loggedIn}
                    manageLogin={this.manageLogin}>
                </Nav>
                <ViewMyEventsHeader>
                </ViewMyEventsHeader>
                {/* I'm thinking it's not a problem to duplicate events (for the ones you've made and 
                are also signed up for)... if you are in the event you organized, 
                I will try to make a button that will allow editing of the event */}
                <p>Events you are signed up for:</p>
                {this.state.registeredEvents.map( (each) => (
                        
                        <OtherCards
                        image={each.image}
                        eventName={each.name}
                        eventID={each._id}
                        date={each.date}
                        description={each.description}>
                            
                        </OtherCards>
                    ))}
                <hr></hr>
                <p>Events you've organized:</p>
                {this.state.organizedEvents.map( (each) => (
                        
                        <OtherCards
                        image={each.image}
                        eventName={each.name}
                        eventID={each._id}
                        date={each.date}
                        description={each.description}>
                            
                        </OtherCards>
                    ))}
                
            </div>
        )
    }
}

export default MyEvents;
