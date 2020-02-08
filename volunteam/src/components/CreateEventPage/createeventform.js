import React from "react";
import "./createeventform.css";

function CreateEventForm(props) {
    return (
        <div class="row">
            <form class="col s6">
                <div class="row">

                    <div class="input-field col s12">
                        <input id="event_name" type="text" class="validate" name="searchZIP"

                            onChange={props.handleInputChange}
                            value={props.value}></input>

                        <label for="event_name">Event Name</label>
                    </div>

                    <div class="input-field col s12">
                        <input id="address" type="text" class="validate"></input>
                        <label for="address">Address</label>
                    </div>

                    <div class="input-field col s12">
                        <input id="date" type="date" class="validate"></input>
                        <label for="date">Date</label>
                    </div>
                    <div class="input-field col s12">
                        <input id="time" type="time" class="validate"></input>
                        <label for="time">Time</label>
                    </div>
                    <div class="input-field col s12">
                        <input id="description" type="text" class="validate"></input>
                        <label for="description">Description</label>
                    </div>
                </div>
                <a class="waves-effect waves-light btn blue">Create Event</a>
            </form>
        </div>
    );
}

export default CreateEventForm;