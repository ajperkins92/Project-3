import React from 'react';
import { Link } from 'react-router-dom';

import "./nav.css";

function Nav(props) {

    return (
        <nav>
            <div className="nav-wrapper">
                <a href="/" className="brand-logo left">VolunTeam!</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {/* Logging out sets state to Logged Out, and also directs you to home page */}
                    <li className={(props.loggedIn === "true") ? "" : "hidden"}><Link to="#">{`Welcome, ${localStorage.getItem('username')}!`}</Link></li>
                    <li onClick={props.manageLogin} style={{ cursor: "pointer" }}>
                    <Link to={(props.loggedIn === "true") ? "/" : "/loginpage"}>
                            
                            {(props.loggedIn === "true") ? "Log Out" : "Log In"}
                        
                        </Link>
                        
                        
                        </li>

                        {/* <Link>{(props.loggedIn === "true") ? "Log Out" : "Log In"}</Link> */}

                    {/* <Link to={props.href}>{(props.loggedIn === "true") ? "Log Out" : "Log In"}</Link> */}


                    {/* {(props.loggedIn === "true") ? <Link to="/">{(props.loggedIn === "true") ? "Log Out" : "Log In"} </Link>

                        :

                        <Link to="/loginpage">{(props.loggedIn === "true") ? "Log Out" : "Log In"} </Link>} */}

                    <li className={(props.loggedIn === "true") ? "hidden" : ""}><Link to="/signup">Sign Up!</Link></li>
                    <li className={(props.loggedIn === "true") ? "" : "hidden"}><Link to="/myevents">My Events</Link></li>
                    <li className={(props.loggedIn === "true") ? "" : "hidden"}><Link to="/myaccount">My Account</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;
