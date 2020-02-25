import React from "react";
import Autocomplete from "../Autocomplete/Autocomplete"

function CreateEventForm(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col s12">
                    <div className="card-panel">
                        <div className="row SubContainer">
                            <form className="col s12">
                                <div className="row">
                                    <div className="col s12">
                                        <span className="card-title" style={{ fontSize: "3rem" }}>Create Event</span>
                                        <div className="card-image">
                                            <img src="https://raw.github.com/ajperkins92/Project-3/master/client/public/images/seattlePark3.jpg" style={{ width: '90%' }}></img>
                                        </div>
                                        <div className="card-content">
                                            <div className="input-field col s12">
                                                <input id="event_name" type="text" className="validate" name="eventName"

                                                    onChange={props.handleInputChange}
                                                ></input>

                                                <label htmlFor="event_name">Event Name</label>
                                            </div>

                                            <div className="input-field col s12">
                                                <Autocomplete/>
                                            </div>

                                            <div className="input-field col s12">
                                                <input id="createdate" type="date" className="validate" name="date"

                                                    onChange={props.handleInputChange}


                                                ></input>
                                                <label htmlFor="date">Date</label>
                                            </div>

                                            <div className="input-field col s12">
                                                <input id="createtime" type="time" className="validate" name="time"

                                                    onChange={props.handleInputChange}


                                                ></input>
                                                <label htmlFor="time">Time</label>
                                            </div>

                                            <div className="input-field col s12">
                                                <input id="createdescription" type="text" className="validate" name="description"

                                                    onChange={props.handleInputChange}

                                                ></input>
                                                <label htmlFor="description">Description</label>
                                            </div>
                                            <div className="row fileInput">
                                                <div className="col s12">
                                                    <form action="#">
                                                        <div className="file-field input-field">
                                                            <div className="badge blue">
                                                                <span id="upload">Upload Event Picture</span>
                                                                <input type="file" name="image" onChange={props.setImage} ></input>
                                                            </div>
                                                            <input className="file-path validate" type="text"></input>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <a className="waves-effect waves-light btn purple pulse" id="createEvent" onClick={props.handleFormSubmit}>Create Event</a>
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

export default CreateEventForm;