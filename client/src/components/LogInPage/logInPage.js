import React from "react";

function LogInPageComponent(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col s12">
                    <div className="card-panel">
                        <div className="row subContainer">
                            <form className="col s12">
                                <div className="row">
                                    <div className="col s12">
                                        <span className="card-title" style={{ fontSize: "3rem" }}>Log In</span>
                                        <div className="card-image">
                                            <img src={"https://raw.github.com/ajperkins92/Project-3/master/client/public/images/seattlePark2.jpg"} style={{ width: "100%" }} />
                                        </div>
                                        <br />
                                        <div className="card-content">
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <input id="username" type="text" className="validate" name="username"

                                                    onChange={props.handleInputChange}
                                                    

                                                    ></input>
                                                    <label htmlFor="username">Username</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <input id="password" type="password" className="validate" name="password"
                                                    
                                                    onChange={props.handleInputChange}
                                                    

                                                    ></input>
                                                    <label htmlFor="password">Password</label>
                                                </div>
                                            </div>
                                            <a className="waves-effect waves-light btn green pulse" id="login" onClick={props.handleFormSubmit}>Log In</a>
    <br></br><br></br>
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

export default LogInPageComponent;