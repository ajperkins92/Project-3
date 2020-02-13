import React from 'react';
import {Link} from 'react-router-dom';

import "./othercards.css"

function OtherCards(props) {

    return (
        <div className="col">
            <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator" src={props.image}></img>
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">{props.eventName}<i
                        className="material-icons right">{props.date}</i></span>
                        {/* href pointing to a dynamic route (on react Router, need to specify a catch all like /event/*, so that
                            whatever the id is, the /event page is still rendered, but the param does not affect the page, just the props ) */}
                    <p><Link to={`view/event/${props.eventID}`}>See More about {props.eventName}!</Link></p>
                   
                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                    <p>Description:<br></br>{props.description}</p>
                </div>
            </div>
        </div>
    )
}

export default OtherCards;