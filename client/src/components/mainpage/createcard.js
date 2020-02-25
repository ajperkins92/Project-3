import React from "react";
import { Link } from "react-router-dom";
import "./createcard.css" 

function CreateCard(props) {
  return (
    <div className="col col s12 m6 l4 xl3">
      <div className="create-card card">
        <div className="card-image waves-effect waves-block waves-light">
          <img
            style={{height: "200px"}}
            className="activator"
            src="https://media.giphy.com/media/xUA7b4arnbo3THfzi0/giphy.gif"
          ></img>
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">
            <b>Create Event</b><i className="material-icons right">add_circle_outline
</i>
          </span>
          <p>
            <Link to={(props.loggedIn === "true") ? "/createevent" : "/loginpage"}>Click here to create an event!</Link>
          </p>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            Create Event
          </span>
          <p>
            If you have an idea for a volunteer event in your local community,
            click<Link to={(props.loggedIn === "true") ? "/createevent" : "/loginpage"}> here </Link>
            to be directed to a page where you can input your event information!
            You will show up as the event organizer when you click on that
            event's information, and can edit the event after it's created!
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateCard;
