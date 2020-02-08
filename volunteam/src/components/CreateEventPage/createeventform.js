import React from "react";
import "./createeventform.css";

function CreateEventForm(props) {
    return (
        <div class="row">
            <form class="col s6">
                <div class="row">

                    <div class="input-field col s12">
                        <input id="event_name" type="text" class="validate" name="eventName"

                            onChange={props.handleInputChange}
                            value={props.valueName}></input>

                        <label for="event_name">Event Name</label>
                    </div>

                    <div class="input-field col s12">
                        <input id="address" type="text" class="validate" name="address"

                            onChange={props.handleInputChange}
                            value={props.valueAddress}

                        ></input>
                        <label for="address">Address</label>
                    </div>

                    <div class="input-field col s12">
                        <input id="date" type="date" class="validate" name="date"

                            onChange={props.handleInputChange}
                            value={props.valueDate}

                        ></input>
                        <label for="date">Date</label>
                    </div>

                    <div class="input-field col s12">
                        <input id="time" type="time" class="validate" name="time"

                            onChange={props.handleInputChange}
                            value={props.valueTime}

                        ></input>
                        <label for="time">Time</label>
                    </div>

                    <div class="input-field col s12">
                        <input id="description" type="text" class="validate" name="description"

                            onChange={props.handleInputChange}
                            value={props.valueDescription}
                        ></input>
                        <label for="description">Description</label>
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