import React from "react";
//import "./viewOneEventPage.css";

function ViewOneEventPageComponent() {
    return (
        <div className="container">
            <div class="row">
                <div class="col s12">
                    <div class="card-panel">
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
                                            <div class="collection">
                                                <a href="#!" className="collection-item">Event Name : <span className="eventname">Clean up the town</span></a>
                                                <a href="#!" className="collection-item">Google Map Image<img className="eventimage"
                                                    src={"https://raw.github.com/ajperkins92/Project-3/master/client/public/images/samplemap.jpg"} style={{ width: "100%" }} /></a>
                                                <a href="#!" className="collection-item">Address : <span className="eventaddress">12345 12345th Ave, Seattle, WA 99999</span></a>
                                                <a href="#!" className="collection-item">Date : <span className="eventdate">02 / 20 / 2020</span></a>
                                                <a href="#!" className="collection-item">Time : <span className="eventtime">11 : 30 : AM</span></a>
                                                <a href="#!" className="collection-item">Description : <span className="eventdescription">Attendees will come and clean the Street of Seattle</span></a>
                                                <a href="#!" className="collection-item">Organizer : <span className="eventorganizer">John Doe</span></a>
                                                <a href="#!" className="collection-item">Attendees : <span className="eventattendees">John Dow, Steve Doe, Tom Doe, Emily Doe</span></a>
                                            </div>
                                            <a className="waves-effect waves-light btn green pulse" id="attend">Attend</a>
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

export default ViewOneEventPageComponent;