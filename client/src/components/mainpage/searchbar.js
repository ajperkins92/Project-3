import React from 'react';
import "../mainpage/searchbar.css"

function SearchBar(props) {

    return (
        <div className="row">
        <br></br>
        <br></br>
        <br></br>
            <div className="col s1 m2 l3 xl4"></div>
            <div className="input-field search-input-field col s10 m8 l6 xl4">

                <input placeholder="Search events (place, address, description, etc...)" id="zipCodeSearch" type="text" className="validate" name="searchquery"

                onChange={props.handleInputChange}
                value={props.value}

                ></input>

                <button className="btn search-submit waves-effect waves-light" type="submit" name="action"

                onClick={props.handleFormSubmit}

                >Search!<i className="material-icons right"></i>
                </button>
            </div>
            <div className="col s1 m2 l3 xl4"></div>
            <br></br>
        </div>
    )
}

export default SearchBar;