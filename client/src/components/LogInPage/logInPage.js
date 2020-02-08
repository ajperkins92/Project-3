import React from "react";
import "./logInPage.css";

function LogInPageComponent() {
    return (
        <div className="container">
            <div className="row subContainer">
                <form className="col s12">
                    <div className="row">
                        <div className="col s12">
                            <div className="card">
                                <span className="card-title">Log In</span>
                                <div className="card-image">
                                    <img src={"https://raw.github.com/ajperkins92/Project-3/master/client/public/images/seattlePark2.jpg"} style={{ width: "90%" }} />
                                </div>
                                <div className="card-content">
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="username" type="text" className="validate" />
                                            <label for="username">Username</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="password" type="password" className="validate" />
                                            <label for="password">Password</label>
                                        </div>
                                    </div>
                                    <a className="waves-effect waves-light btn green pulse" id="login">Log In</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LogInPageComponent;