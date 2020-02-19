import React from "react";
import { Link } from "react-router-dom";
import "./createcard.css" 

function CreateCard(props) {
  return (
    <div className="col">
      <div className="card">
        <div className="card-image waves-effect waves-block waves-light">
          <img
            className="activator"
            src="https://image.flaticon.com/icons/svg/892/892926.svg"
          ></img>
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">
            Create Event<i className="material-icons right">add_circle_outline
</i>
          </span>
          <p>
            <Link to={(props.loggedIn === "true") ? "/createevent" : "/loginpage"}>Create Event</Link>
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
