import React from "react";
import "./createeventform.css";

function CreateEventForm(props) {
    return (
        <div className="row">
            <form className="col s6">
                <div className="row">

                    <div className="input-field col s12">
                        <input id="event_name" type="text" className="validate" name="eventName"

                            onChange={props.handleInputChange}
                            value={props.value}></input>

                        <label htmlFor="event_name">Event Name</label>
                    </div>

                    <div className="input-field col s12">
                        <input id="address" type="text" className="validate" name="address"

                            onChange={props.handleInputChange}
                            value={props.value}

                        ></input>
                        <label htmlFor="address">Address</label>
                    </div>

                    <div className="input-field col s12">
                        <input id="date" type="date" className="validate" name="date"

                            onChange={props.handleInputChange}
                            value={props.value}

                        ></input>
                        <label htmlFor="date">Date</label>
                    </div>

                    <div className="input-field col s12">
                        <input id="time" type="time" className="validate" name="time"

                            onChange={props.handleInputChange}
                            value={props.value}

                        ></input>
                        <label htmlFor="time">Time</label>
                    </div>

                    <div className="input-field col s12">
                        <input id="description" type="text" className="validate" name="description"

                            onChange={props.handleInputChange}
                            value={props.value}
                        ></input>
                        <label htmlFor="description">Description</label>
                    </div>
                </div>
                <button className="btn waves-effect waves-light" type="submit" name="action"

                    onClick={props.handleFormSubmit}

                >Submit<i className="material-icons right"></i>
                </button>
            </form>
        </div>
    );
}

export default CreateEventForm;