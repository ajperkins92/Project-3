import React from 'react';

import "./nav.css";

function Nav(props) {

    return (
        <nav>
            <div className="nav-wrapper indigo">
                <a href="#" className="brand-logo left">VolunTeam!</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href={(props.loggedIn) ? "/logout" : "/login"}>{(props.loggedIn) ? "Log Out" : "Log In"}</a></li>
                    <li className={(props.loggedIn) ? "hidden" : ""}><a href="/signup">Sign Up!</a></li>
                    <li className={(props.loggedIn) ? "" : "hidden"}><a href="/myevents">My Events</a></li>
                    <li className={(props.loggedIn) ? "" : "hidden"}><a href="/myaccount">My Account</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;