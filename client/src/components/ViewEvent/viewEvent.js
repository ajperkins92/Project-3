import React from "react";
import "./viewEvent.css";
import Autocomplete from "../Autocomplete/Autocomplete"
import { Link } from "react-router-dom"

function ViewEventComponent(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <div className="card-panel">
            <div className="row subContainer">
              <form className="col s12">
                <div className="row">
                  <div className="col s12">
                    <span className="card-title" style={{ fontSize: "3rem" }}>
                      View Event
                    </span>
                    <br></br>
                    <span
                      className="card-title"
                      style={{ fontSize: "1rem", color: "green" }}
                    >
                      <i>
                        {props.admin === true
                          ? "*Note:  You are the organizer for this event!  Editing this event's details can be done below."
                          : ""}
                      </i>
                    </span>
                    <br></br>
                    <div className="card-image">
                      <img
                        src={
                          (props.image) ? props.image :
                            "https://raw.github.com/ajperkins92/Project-3/master/client/public/images/seattlePark2.jpg"
                        }
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                    <br />
                    <div className="card-content">
                      {props.editing === true ? (
                        <div className="collection">
                          <a className="collection-item">
                            Change Event Name from <b>{props.name}</b> to:
                          </a>

                          <input
                            id="eventname"
                            type="text"
                            className="validate"
                            name="newname"
                            onChange={props.handleInputChange}
                          />

                          <a className="collection-item">
                            Google Map Image
                            <iframe
                               style={{border:"0", width: "600", height: "450", frameborder: "0", border: "0px",
                               position: "relative",
                               width: "100%",
                               minHeight: "30rem", maxHeight: "40rem"}}
                                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBaLU-7p4spFKf611ZrMTTZoQUCC2KMgbg&q=${props.address}`} >
                              </iframe>
                          </a>
                          <a className="collection-item">
                            Change Event Address from <b>{props.address}</b> to:
                          </a>

                          <Autocomplete
                          color={"lightgoldenrodyellow"}></Autocomplete>
                          
                          <a className="collection-item">
                            Change Event Date from <b>{props.date}</b> to:
                          </a>

                          <input
                            id="date"
                            type="date"
                            className="validate"
                            name="newdate"
                            onChange={props.handleInputChange}
                          />
                          <label htmlFor="date"></label>

                          <a className="collection-item">
                            Change Event Time from <b>{props.time}</b> to:
                          </a>

                          <input
                            id="time"
                            type="time"
                            className="validate"
                            name="newtime"
                            onChange={props.handleInputChange}
                          />
                          <label htmlFor="time"></label>

                          <a className="collection-item">
                            Change Event Description from{" "}
                            <b>{props.description}</b> to:{" "}
                            <input
                              id="description"
                              type="text"
                              className="validate"
                              name="newdescription"
                              onChange={props.handleInputChange}
                            />
                            <label htmlFor="description"></label>
                          </a>
                          <a className="collection-item">
                            Change Event Image{" "}
                            <div className="col s12">
                              <form action="#">
                                <div className="file-field input-field">
                                  <div className="badge blue">
                                    <span id="upload">Upload New Event Picture</span>
                                    <input type="file" name="image" onChange={props.setImage} ></input>
                                  </div>
                                  <input className="file-path validate" type="text"></input>
                                </div>
                              </form>
                            </div>
                          </a>

                          <textarea
                            id="description"
                            class="materialize-textarea"
                            name="newdescription"
                            onChange={props.handleInputChange}
                          ></textarea>

                          <a className="collection-item">
                            Organizer :{" "}
                            <span className="eventorganizer">
                              {props.organizername}
                            </span>
                          </a>
                          <a className="collection-item">
                            Attendees :{" "} <br />
                            <ul>
                              {props.attendees}
                            </ul>
                          </a>
                        </div>
                      ) : (
                          <div className="collection">
                            <a className="collection-item">
                              <b>Event Name :</b>{" "}
                              <span className="eventname">{props.name}</span>
                            </a>
                            <a className="collection-item">
                              <div>
                                <p>Google Map Image</p>
                              <iframe
                               style={{border:"0", width: "600", height: "450", frameborder: "0", border: "0px",
                               position: "relative",
                               width: "100%",
                               minHeight: "30rem", maxHeight: "40rem"}}
                                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBaLU-7p4spFKf611ZrMTTZoQUCC2KMgbg&q=${props.address}`} >
                              </iframe>
                              </div>
                              
                            </a>
                            <a className="collection-item">
                              <b>Address :</b>{" "}
                              <span className="eventaddress">
                                {props.address}
                              </span>
                            </a>
                            <a className="collection-item">
                              <b>Date :</b>{" "}
                              <span className="eventdate">{props.date}</span>
                            </a>
                            <a className="collection-item">
                              <b>Time :</b>{" "}
                              <span className="eventtime">{props.time}</span>
                            </a>
                            <a className="collection-item">
                              <b>Event is:</b>{" "}
                              <span className="eventtime">{props.timeTo}</span>
                            </a>
                            <a className="collection-item">
                              <b>Description :</b>{" "}
                              <span className="eventdescription">
                                {props.description}
                              </span>
                            </a>
                            <a className="collection-item">
                              <b>Organizer :</b>{" "}
                              <span className="eventorganizer">
                                {props.organizername}
                              </span>
                            </a>
                            <a className="collection-item">
                              <b>Attendees :</b>{" "} <br />
                              <span className="eventattendees">
                                {props.attendees}
                              </span>
                            </a>
                            
                            <a
                              class="resp-sharing-button__link"
                              href="https://twitter.com/intent/tweet/?text=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;url=http%3A%2F%2Fsharingbuttons.io"
                              target="_blank"
                              rel="noopener"
                              aria-label="Share on Twitter"
                            >
                              <div class="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--large">
                                <div
                                  aria-hidden="true"
                                  class="resp-sharing-button__icon resp-sharing-button__icon--solid"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
                                  </svg>
                                </div>
                                Share on Twitter
                            </div>
                            </a>
                          </div>
                        )}

                      <a
                        className="waves-effect waves-light btn green pulse"
                        id="attend"
                        onClick={() =>
                          props.attend(props.userID, props.eventID)
                        }
                      >
                        Attend
                      </a>


                      <br></br>
                      <br></br>

                      {// Are you an admin?
                        props.admin === true ? (
                          // Yes, I am an admin

                          // If so, are you editing?
                          props.editing === true ? (
                            // Yes, I am editing
                            <div>
                              <a
                                className="waves-effect waves-light btn cyan "
                                id="attend"
                                onClick={props.handleFormSubmit}
                              >
                                Submit
                            </a>
                              <Link to={"/myevents"}>
                                <a
                                  className="waves-effect waves-light btn red "
                                  id="attend"
                                  onClick={() => props.delete(props.eventID)}
                                >
                                  Delete Event
                            </a>
                              </Link>
                              <br></br>
                              <br></br>
                              <a
                                className="waves-effect waves-light btn amber "
                                id="attend"
                                onClick={() => props.cancel()}
                              >
                                Cancel Editing
                            </a>
                            </div>
                          ) : (
                              // No, I am not editing
                              <div>

                                <a
                                  className="waves-effect waves-light btn cyan pulse"
                                  id="attend"
                                  onClick={() => props.edit()}
                                >
                                  Edit Event
                            </a>

                              </div>
                            )
                        ) : (
                            // No, I am not an admin
                            ""
                          )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEventComponent;
