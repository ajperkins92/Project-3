import React from 'react';

function SearchBar(props) {

    return (
        <div className="row">
            <div className="input-field col s6">

                <input placeholder="ZIP Code" id="zipCodeSearch" type="text" className="validate" name="searchZIP"

                onChange={props.handleInputChange}
                value={props.value}

                ></input>

                <label htmlFor="zipCodeSearch">Search For Events In Your Area!</label>

                <button className="btn waves-effect waves-light" type="submit" name="action"

                onClick={props.handleFormSubmit}

                >Submit<i className="material-icons right"></i>
                </button>
            </div>
        </div>
    )
}

export default SearchBar;