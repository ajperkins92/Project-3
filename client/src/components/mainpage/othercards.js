import React from 'react';
import { Link } from 'react-router-dom';

import "./othercards.css"

function OtherCards(props) {

    return (
        <div className="col s12 m6 l4 xl3">
            <div className="card display-cards">
                <div className="card-image waves-effect waves-block waves-light image-container">
                    <img className="activator" src={props.image}></img>
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">{props.eventName}</span>
                    <span>{props.date}</span>
                    {/* href pointing to a dynamic route (on react Router, need to specify a catch all like /event/*, so that
                            whatever the id is, the /event page is still rendered, but the param does not affect the page, just the props ) */}
                    <p><Link to={`view/event/${props.eventID}`}>{props.eventName}!</Link></p>

                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">{props.eventName}</span>
                    <p>Description:<br></br>{props.description}</p>
                </div>
            </div>
        </div>

    )
}

export default OtherCards;