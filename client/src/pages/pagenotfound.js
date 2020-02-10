import React from 'react';
import Nav from '../components/mainpage/nav'

function PageNotFound() {

    return (
        <div className="col s12">
            <Nav/>
            <div className="row">
                <h1 style={{textAlign: "center"}}>404: Nothing Here!</h1>
            </div>
        </div>
    )
}


export default PageNotFound