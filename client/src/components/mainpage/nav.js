import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import "./nav.css";

function Nav(props) {
  return (
    <nav>
      <div className="nav-wrapper indigo">
        <a href="/" className="brand-logo left">
          VolunTeam!
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {/* Logging out sets state to Logged Out, and also directs you to home page */}
          <li onClick={props.manageLogin}>
            <Link href={props.loggedIn === "true" ? "/" : "/loginpage"}>
              {props.loggedIn === "true" ? "Log Out" : "Log In"}
            </Link>
          </li>
          <li className={props.loggedIn === "true" ? "hidden" : ""}>
            <Link href="/signup">Sign Up!</Link>
          </li>
          <li className={props.loggedIn === "true" ? "" : "hidden"}>
            <Link href="/myevents">My Events</Link>
          </li>
          <li className={props.loggedIn === "true" ? "" : "hidden"}>
            <Link href="/myaccount">My Account</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
