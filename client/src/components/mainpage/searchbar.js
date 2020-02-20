import React from 'react';

function SearchBar(props) {

    return (
        <div className="row">
            <div className="input-field col s6 center">

                <input placeholder="Input a place, address, description, etc..." id="zipCodeSearch" type="text" className="validate" name="searchquery"

                onChange={props.handleInputChange}
                value={props.value}

                ></input>

                <label htmlFor="zipCodeSearch">Search For Events!</label>

                <button className="btn waves-effect waves-light" type="submit" name="action"

                onClick={props.handleFormSubmit}

                >Submit<i className="material-icons right"></i>
                </button>
            </div>
        </div>
    )
}

export default SearchBar;