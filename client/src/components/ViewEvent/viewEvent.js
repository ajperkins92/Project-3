import React from "react";
import "./viewEvent.css";

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
                                        <span className="card-title" style={{ fontSize: "3rem" }}>View Event</span>
                                        <br></br>
                                        <span className="card-title" style={{ fontSize: "1rem", color: "green" }}><i>*Note:  You are the organizer for this event!  Editing this event's details can be done below.</i></span>
                                        <br></br>
                                        <div className="card-image">
                                            <img src={"https://raw.github.com/ajperkins92/Project-3/master/client/public/images/seattlePark2.jpg"} style={{ width: "100%" }} />
                                        </div>
                                        <br />
                                        <div className="card-content">
                                            {(props.editing === true) ?

                                                <div className="collection">
                                                    <a className="collection-item">Change Event Name from <b>{props.name}</b> to:</a>


                                                    <input id="eventname" type="text" className="validate"
                                                        name="newname"
                                                        onChange={props.handleInputChange}
                                                    />
                                                    <label htmlFor="eventname">New Event Name</label>


                                                    <a className="collection-item">Google Map Image<img className="eventimage"
                                                        src={"https://raw.github.com/ajperkins92/Project-3/master/client/public/images/samplemap.jpg"} style={{ width: "100%" }} /></a>
                                                    <a className="collection-item">Change Event Address from <b>{props.address}</b> to:</a>

                                                    <input id="address" type="text" className="validate"
                                                        name="newaddress"
                                                        onChange={props.handleInputChange}
                                                    />
                                                    <label htmlFor="address">New Address</label>


                                                    <a className="collection-item">Change Event Date from <b>{props.date}</b> to:</a>

                                                    <input id="date" type="date" className="validate"
                                                        name="newdate"
                                                        onChange={props.handleInputChange}
                                                    />
                                                    <label htmlFor="date"></label>


                                                    <a className="collection-item">Change Event Time from <b>{props.time}</b> to:</a>

                                                    <input id="time" type="time" className="validate"
                                                        name="newtime"
                                                        onChange={props.handleInputChange}
                                                    />
                                                    <label htmlFor="time"></label>


                                                    <a className="collection-item">Event is: <span className="eventtime">{props.timeTo}</span></a>
                                                    <a className="collection-item">Change Event Description from <b>{props.description}</b> to: </a>

                                                    {/* <input id="description" type="description" className="validate"
                                                        name="newdescription"
                                                        onChange={props.handleInputChange}
                                                    />
                                                    <label htmlFor="description">New Description</label> */}

                                                    
                                                        <textarea id="description" class="materialize-textarea"
                                                        
                                                        name="newdescription"
                                                        onChange={props.handleInputChange}
                                                        ></textarea>
                                                        <label htmlFor="description">New Description</label>
                                                    


                                                    <a className="collection-item">Organizer : <span className="eventorganizer">{props.organizer}</span></a>
                                                    <a className="collection-item">Attendees : <span className="eventattendees">{props.attendees}</span></a>
                                                </div>

                                                :

                                                <div className="collection">
                                                    <a className="collection-item">Event Name : <span className="eventname">{props.name}</span></a>
                                                    <a className="collection-item">Google Map Image<img className="eventimage"
                                                        src={"https://raw.github.com/ajperkins92/Project-3/master/client/public/images/samplemap.jpg"} style={{ width: "100%" }} /></a>
                                                    <a className="collection-item">Address : <span className="eventaddress">{props.address}</span></a>
                                                    <a className="collection-item">Date : <span className="eventdate">{props.date}</span></a>
                                                    <a className="collection-item">Time : <span className="eventtime">{props.time}</span></a>
                                                    <a className="collection-item">Event is: <span className="eventtime">{props.timeTo}</span></a>
                                                    <a className="collection-item">Description : <span className="eventdescription">{props.description}</span></a>
                                                    <a className="collection-item">Organizer : <span className="eventorganizer">{props.organizer}</span></a>
                                                    <a className="collection-item">Attendees : <span className="eventattendees">{props.attendees}</span></a>
                                                </div>
                                            }


                                            <a className="waves-effect waves-light btn green pulse" id="attend" onClick={() => props.attend(props.userID, props.eventID)}>Attend</a>
                                            <br></br><br></br>



                                            {(props.editing === true) ?

                                                <div>
                                                    <a className="waves-effect waves-light btn cyan " id="attend" onClick={props.handleFormSubmit}>Submit</a>
                                                    <a className="waves-effect waves-light btn red " id="attend" onClick={() => props.delete(props.eventID)}>Delete Event</a>
                                                    <br></br><br></br>
                                                    <a className="waves-effect waves-light btn amber " id="attend" onClick={() => props.cancel()}>Cancel Editing</a>

                                                </div>
                                                :
                                                <div>
                                                    <a className="waves-effect waves-light btn cyan pulse" id="attend" onClick={() => props.edit()}>Edit Event</a>
                                                </div>
                                            }

                                        </div>


                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ViewEventComponent;