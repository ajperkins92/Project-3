import React from 'react';

import "./nav.css";

function Nav(props) {

    return (
        <nav>
            <div className="nav-wrapper indigo">
                <a href="/" className="brand-logo left">VolunTeam!</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {/* Logging out sets state to Logged Out, and also refreshes the page so you need to log in again.  
                    If you login, the page does NOT refresh.  That's the difference between "/" and "#", where # says literally don't do anything" */}
                    <li onClick={props.manageLogin}><a href={(props.loggedIn) ? "/loginpage" : "#"}>{(props.loggedIn) ? "Log Out" : "Log In"}</a></li>
                    <li className={(props.loggedIn) ? "hidden" : ""}><a href="/signup">Sign Up!</a></li>
                    <li className={(props.loggedIn) ? "" : "hidden"}><a href="/myevents">My Events</a></li>
                    <li className={(props.loggedIn) ? "" : "hidden"}><a href="/myaccount">My Account</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;