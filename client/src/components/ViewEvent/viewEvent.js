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
                                        <div className="card-image">
                                            <img src={"https://raw.github.com/ajperkins92/Project-3/master/client/public/images/seattlePark2.jpg"} style={{ width: "100%" }} />
                                        </div>
                                        <br />
                                        <div className="card-content">
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
                                            <a className="waves-effect waves-light btn green pulse" id="attend" onClick={() => props.attend(props.userID, props.eventID)}>Attend</a>
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