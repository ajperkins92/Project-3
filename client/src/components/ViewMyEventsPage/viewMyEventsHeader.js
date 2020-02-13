import React from "react";
import "./viewMyEventsHeader.css";

function EventsHeader(props) {
    return (
        
        <div>
            <div class="row">
                <div class="col s12 m6">
                    <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                            <span class="card-title">My Events</span>
                            <p>Browse the events you've either created or signed up for here!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventsHeader;