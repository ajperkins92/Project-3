import React from 'react';
import {Link} from 'react-router-dom';

function CreateCard(props) {

    return (
        <div className="col">
            <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator" src="https://image.flaticon.com/icons/svg/892/892926.svg"></img>
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">Create Event<i
                        className="material-icons right">more_vert</i></span>
                    <p><Link to="/createevent">Create an Event</Link></p>
                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                    <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </div>
            </div>
        </div>
    )
}

export default CreateCard;