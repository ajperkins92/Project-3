import React from 'react';


import "./nav.css";

function Nav(props) {

    return (
        <nav>
            <div className="nav-wrapper indigo">
                <a href="/" className="brand-logo left">VolunTeam!</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {/* Logging out sets state to Logged Out, and also directs you to home page */}
                    <li onClick={props.manageLogin}><a href={(props.loggedIn === "true") ? "/" : "/loginpage"}>{(props.loggedIn === "true") ? "Log Out" : "Log In"}</a></li>
                    <li className={(props.loggedIn === "true") ? "hidden" : ""}><a href="/signup">Sign Up!</a></li>
                    <li className={(props.loggedIn === "true") ? "" : "hidden"}><a href="/myevents">My Events</a></li>
                    <li className={(props.loggedIn === "true") ? "" : "hidden"}><a href="/myaccount">My Account</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;